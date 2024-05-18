This needs to be updated for multiple changes in the jbrowse build process.

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
- protein-### is the branch for building specific releases

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

1. After GFF files are available on dev server at `/usr/local/ftp/pub/wormbase/releases/`,
   create branches of this repo for each JBrowse (jbrowse-$RELEASE),
   protein-schematic (protein-$RELEASE) and JBrowse 2 (jb2-$RELEASE)
   off of their "staging" branches. Note that references to $RELEASE in this
   document means the release numeral (ie, without the "WS").

2. Prepare JBrowse data and place in the Alliance JBrowse S3 bucket
   (s3://agrjbrowse/MOD-jbrowses/WormBase/): Data preperation takes place in
   Docker containers that run on the Alliance GoCD server. These containers are
   defined in their own GitHub repos:
   
   a. https://github.com/WormBase/website-jbrowse-gff processes the GFF files
   obtained from ftp.wormbase.org and places the results in the agrjbrowse bucket.
   
   b. https://github.com/WormBase/website-jbrowse-protein processes the "amino
   acid" space GFF files from the WormBase ftp site and places them in the
   Alliance JBrowse S3 bucket.
   
   See the README documents in each of these repos for details on how they run.

3. Build the configuration files. During the running of the previous step for
   genomic assemblies (as opposed to the protein browser, more on that below),
   "preliminary" trackConfig.json files are created that indicate what data
   types are available for each assembly and placed in the S3 bucket along with
   the formatted data. The Dockerfiles that used to be used to serve JBrowse 1
   and 2 (and still can be for testing or providing to users) now generates
   full configuration files for the current release's JBrowse 1 and 2. The
   relevent Dockerfiles that are needed are:
   a. https://github.com/WormBase/website-genome-browsers/blob/jbrowse-staging/jbrowse/Dockerfile
   and
   b. https://github.com/WormBase/website-genome-browsers/blob/jb2-staging/jbrowse2/Dockerfile.mkzip

4. Build the configuration files

5. Update the "amplify" repos for each of the servers.

# Moving from staging to production

Since the three JBrowse instances are all served by AWS Amplify, all that
needs to be done to move the staging instances into production is to merge
each of the staging branches into the main branch in each "amplify-wb" repo.
