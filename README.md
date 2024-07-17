This is the WormBase website-genome-browsers repository.

It contains the configuration files for GBrowse and GBrowse_syn (no longer
updated) last several releases and the build tools and json configuration files
for JBrowse, JBrowse 2 and the JBrowse-based protein schematic tool.

# Important Git branches

The master branch isn't used for anthing other than housing this README.

For GBrowse and gbrowse_syn:

- gbrowse-production is the current production config
- staging (NOT gbrowse-staging) is the current staging config
- ###-gbrowse is the branch for building a specific release

Since gbrowse_syn doesn't change from release to release, it uses
the same branches as GBrowse.

For JBrowse:

- jbrowse-production is the current production config
- jbrowse-staging is the current staging config
- jbrowse-### is the branch for building specific releases

For the protein schematic tool:

- protein_schematic_production is the production config
- protein_schematic_staging is the staging config
- protein-### is the branch for building specific releases (this branch is
  generally not needed any more since the switch to AWS Amplify--see notes below).

JBrowse 2

- jb2-production is the production config
- jb2-staging is the staging config
- jb2-### is the branch for building specific releases

Alliance of Genome Resources JBrowse plugin:

- agr-release-#.#.# is the branch for tracking the plugin at
  website-genome-browsers/jbrowse/jbrowse/plugins/wormbase-glyphs/
  which provides custom glyphs for JBrowse and inserts the
  AGR logo above the track selector list.

# Typical build procedure

1. After GFF files are available on the ftp site ftp.wormbase.org,
   create branches of this repo for each JBrowse (jbrowse-$RELEASE),
   and JBrowse 2 (jb2-$RELEASE) off of their "staging" branches. Note that
   references to $RELEASE in this document means the release numeral (ie,
   without the "WS"). Note that it is generally not necessary to create a
   release specific banch for the protein browser.

2. Prepare JBrowse data and place in the Alliance JBrowse S3 bucket
   (s3://agrjbrowse/MOD-jbrowses/WormBase/): Data preperation takes place in
   Docker containers that run on the Alliance GoCD server. These containers are
   defined in their own GitHub repos:

   a. https://github.com/WormBase/website-jbrowse-gff processes the GFF files
   obtained from ftp.wormbase.org and places the results in the agrjbrowse bucket.
   (Note that the README in the website-jbrowse-gff repo will require
   changes to this repo before running the analysis step.)

   b. https://github.com/WormBase/website-jbrowse-protein processes the "amino
   acid" space GFF files from the WormBase ftp site and places them in the
   Alliance JBrowse S3 bucket.

   See the README documents in each of these repos for details on how they run.
   Usually, the only thing that needs to change those repos the value of
   `$RELEASE` in their `parallel.sh` scripts (if those aren't updated, you run
   the risk of overwriting the data of the current production release when
   these tools are run).

3. Build the configuration files. During the running of the previous step for
   genomic assemblies (as opposed to the protein browser, more on that below),
   "preliminary" trackConfig.json files are created that indicate what data
   types are available (and thus, what tracks will appear) for each assembly
   and placed in the S3 bucket along with the formatted data. The Dockerfile
   that used to be used to serve JBrowse 1 (and still can be for testing or
   providing to users) now generates full configuration files for the current
   release's JBrowse 1. For JBrowse 2, the `Dockerfile.mkzip` container places
   a zip file of the entire set of files needed for running JBrowse 2 in the top
   level of the AWS S3 bucket (agrjbrowse). The relevent Dockerfiles that are
   needed are:

   a. https://github.com/WormBase/website-genome-browsers/blob/jbrowse-staging/jbrowse/Dockerfile

   and

   b. https://github.com/WormBase/website-genome-browsers/blob/jb2-staging/jbrowse2/Dockerfile.mkzip

4. Get the configuration files. For JBrowse 1, run the docker container somewhere
   in a server configuration (that is, provide `-d` and `-p ##:##` flags in the
   `docker run` command). Usually, I just run the container on my laptop, so the
   run command looks like:

   ```
   docker run -d -p 8080:80 jb1_container
   ```

   point your browser at (or `curl -O` at) http://servername:port/tools/genome.tar.gz
   The contents of the genome.tar.gz file are the jbrowse and jbrowse-simple
   directories that also exist in the JBrowse 1 Amplify repo.

   For JBrowse 2, building the `Dockerfile.mkzip` deposits a zip file in the
   top level directory of the Alliance JBrowse S3 bucket. Note that this
   container doesn't need to `run`. Just building it gets the necessary file.
   The build command looks like this:

   ```
   docker build --build-arg "AWS_ACCESS_KEY_ID=<access>" \
    --build-arg "AWS_SECRET_ACCESS_KEY=<secret>" \
    --no-cache -f Dockerfile.mkzip -t jb2-mkzip .
   ```

   Get the zip file from the bucket:

   ```
   aws s3 cp s3://agrjbrowse/jbrowse2-release$RELEASE.zip .
   ```

5. Update the Amplify repos. For JBrowse 1, expand the tarball in a temporary
   directory where you will get a `jbrowse` and `jbrowse-simple` directories.
   The contents of the data directories in each of these jbrowse directories
   needs to be rsync'ed to the same directory in the `amplify-wb-jbrowse1`
   repo. For example, like this:

   ```
   rsync -av jbrowse/data/        ~/amplify-wb-jbrowse1/jbrowse/data/
   rsync -av jbrowse-simple/data/ ~/amplify-wb-jbrowse1/jbrowse-simple/data/
   ```

   IMPORTANT NOTE: this rsyncing must be done for both directories: jbrowse
   and jbrowse-simple. Add (probably best done via `git add --all`),
   commit and push these changes to the staging branch
   of the `amplify-wb-jbrowse1` repo which will trigger the rebuilding of the
   staging JBrowse 1 instance.

   For JBrowse 2, expand the zip file in a temporary directory (it expands
   in place, so make sure to use a temp directory!):

   ```
   unzip jbrowse2-release$RELEASE.zip
   ```

   and copy the `config.json` file to the top level of the `amplify-wb-jbrowse2`
   repo's staging branch (replacing the config file from the previous release),
   as well as the contents of the `embed` directory to the corresponding
   dirctory in the amplify repo.
   Committing these files and pushing will trigger a rebuilding the staging
   JBrowse 2 instance.

6. Update JBrowse 1 or 2 source (optional). The above directions will cause
   the JBrowse instances to be rebuilt with the new configurations that point at
   the next WormBase data release. If it is desired to update the JBrowse software
   version, that is not too hard.

   a. JBrowse 1: the tarball that contained the configurations for JBrowse 1
   also have all of the code needed to run JBrowse. The build depends on the
   jbrowse github repo and is built from the `dev` branch. If another branch is
   required, be sure to change it before building the container in step 3 above.
   With the contents of the tarball in hand, copy the contents of the `dist`
   directories in each of the jbrowse and jbrowse-simple directories. It is
   typically a good idea to clear out the contents of those directories with
   `git rm` first, to help avoid clutter. So something like this:

   ```
   cd amplify-wb-jbrowse1/jbrowse-simple/dist
   git checkout staging
   git rm *
   cp ~/tmp/jbrowse-simple/dist/* .
   git add *
   git commit
   git push
   ```

   Again, pushing to the staging branch will cause the rebuild of JBrowse 1.

   b. JBrowse 2: to update the JBrowse 2 version that is running at WormBase,
   it's easy to make use of the JBrowse command line interface:
   https://jbrowse.org/jb2/docs/cli/#installation. In this instance, it's a
   good idea to clear out the javascript directory where the code is for
   JBrowse 2, again to prevent the build up of clutter. Upgrading to the
   current release of JBrowse 2 would then look something like this:

   ```
   cd amplify-wb-jbrowse2/static/js
   git checkout staging
   git rm *
   cd ../..
   jbrowse upgrade
   git add --all
   git commit
   git push
   ```

   Again, pushing to the staging branch will cause the rebuild of JBrowse 2 for
   the staging site.

# Updating the protein schematic JBrowse instance

Updating the protein schematic JBrowse instance is similar to it nucleotide
based cousin. Following the first two steps above will result in the protein
data being in place for the coming WormBase release. Updating the configuration
to allow the protein JBrowse find it's data is fairly straight foward, since
the tracks available for each "assembly" doesn't change from release to release.
The only thing that needs to change is the release number in the URLs that point
to the data. Perhaps the easist way to do that is a perl one-liner that updates
all of the involved trackList.json files. For example:

```
cd amplify-wb-prot-schematic/data
git checkout staging
perl -pi -e 's/WS292/WS293/' */trackList.json
git add */trackList.json
git commit
git push
```

And once again, pushing these commits to the staging branch of the
amplify-wb-prot-schematic repo will cause a rebuild of the protein schematic
JBrowse instance on the staging site.

Note that there is a similarly named repo in the WormBase GitHub; please be sure
to use the right one!

# Moving from staging to production

Since the three JBrowse instances are all served by AWS Amplify, all that
needs to be done to move the staging instances into production is to merge
each of the staging branches into the main branch in each "amplify-wb" repo.
