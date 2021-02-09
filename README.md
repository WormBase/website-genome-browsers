This is the WormBase website-genome-browsers repository.

It contains the configuration files for GBrowse and GBrowse_syn for the
last several releases and the build tools and json configuration files
for JBrowse and the JBrowse-based protein schematic tool.

Important Git branches
======================

The master branch isn't used for anthing other than housing README.

For GBrowse and gbrowse_syn:
* gbrowse-production is the current production config
* staging (NOT gbrowse-staging) is the current staging config
* ###-gbrowse is the branch for building a specific release

Since gbrowse_syn doesnt' change from release to release, it uses 
the same branches as GBrowse.

For JBrowse:
* jbrowse-production is the current production config
* jbrowse-staging is the current staging config
* jbrowse-### is the branch for building specific releases

For the protein schematic tool:
* protein_schematic_production is the production config
* protein_schematic_staging is the staging config
* protein -### is the branch for building specific releases

Alliance of Genome Resources JBrowse plugin:
* agr-release-#.#.# is the branch for tracking the plugin at 
website-genome-browsers/jbrowse/jbrowse/plugins/wormbase-glyphs/
which provides custom glyphs for JBrowse and inserts the
AGR logo above the track selector list.

Typical build procedure
=======================

1. After GFF files are available on dev server, create branches of this repo
for each JBrowse (jbrowse-$RELEASE), GBrowse ($RELEASE-gbrowse), and 
protein-schematic (protein-$RELEASE) off of their "staging" branches and
clone it into a space with room to build (currently, a jbrowse build takes
about 30GB and protein schematic takes about 15GB). Note that references to
$RELEASE in this document means the release numeral (ie, without the "WS").

2. Build GBrowse config files:

   a. Run website-admin/update/staging/steps/create_gbrowse_configuration.pl 
    with --release WSnumber and --path pointing at the new git clone,
    new_gbrowse_release_clone/gbrowse.  This process will take a while
    but generally less than 30 minutes.

   b. Add, commit and push the newly created release directory as well as all
    of the updated symlinks in the main directory. The remaining GBrowse tasks
    will take place on the gbrowse.wormbase.org server.

3. Build JBrowse.  This is a much more involved process at the moment.

   a. Run website-genome-browsers/jbrowse/bin/build.sh -r $RELEASE in
      the jbrowse_build/build directory in a screen process.  It will
      take a long time run, generally in the ballpark of 24 hours.

   b. Run website-genome-browsers/jbrowse/bin/upload2s3.sh -r $RELEASE
      This will also take a long time and should be done in a screen.

   c. In parallel with "b", run website-genome-browsers/jbrowse/bin/s3ify_trackList.sh -r $RELEASE
      in the jbrowse_build/jbrowse/tools/genome/jbrowse/data/ directory.
      This "unrolls" the includes in the trackList.json files and
      changes the relative urlTemplate entries to use absolute S3 URLs.

   d. Also in the jbrowse_build/jbrowse/tools/genome/jbrowse/data/ directory,
      run website-genome-browsers/jbrowse/bin/mv_trackLists.sh -r $RELEASE
      which will take the results of the s3ify_trackList.sh script and 
      move them into the place in the checked out git branch for 
      this jbrowse release. Git add, commit and push these files.

   e. Build the jbrowse docker image. In website-genome-browsers/jbrowse/
      run docker build --no-cache -t ws$RELEASE_jbrowse . --build-arg RELEASE=$RELEASE
      and then run a container of the image to test it:
      docker run docker run -d -p 9020:80 ws$RELEASE_jbrowse. Note that
      the staging image of the previous release may still be running
      so it might have to be stopped and removed before running the 
      newly built image.  This instance, running on dev.wormbase.org
      port 9020 is the JBrowse instance for staging.wormbase.org.

   f. Push the docker container to the GMOD account at Docker Hub:
      docker commit -m "WormBase JBrowse release $RELEASE" -a "Scott Cain" <container name> gmod/wormbase-jbrowse:WS$RELEASE;
      docker login; docker push gmod/wormbase-jbrowse:WS$RELEASE

4. Building the JBrowse-based protein_schematic tool.

   a. Copy the build.sh script from the previous build and update
      the release numbers (this should be converted to a "real" bash
      script like is used for JBrowse building). Run build.sh
      in a screen process since it will take a long time.

   b. upload data to S3, build/run docker container 

5. Transfer the GBrowse build results to the gbrowse.wormbase.org
   server's staging section:

   a. In gbrowse.wormbase.org:staging/gbrowse/website-genome-browsers, 
    checkout the release version branch for gbrowse. Restart apache2
    so that it will reread the config files.

   b. Once you're convinced that this build is good, create a pull request
    to merge the release version branch into the staging branch.

   c. Checkout the staging branch on the gbrowse server.


Moving from staging to production
=================================

Before the move, the pull requests should be made from the build-specific
branches into the staging branches ("staging" for GBrowse, "jbrowse-staging"
for JBrowse, protein-staging for protein-schematic), and those should get
pulled into staging with subsequent merges.  See the section above for
more on that.  At some point after that, right before the move to production,
there should be pull requests from staging into the production branches
("production" for GBrowse, "jbrowse-production" for JBrowse, "protein-production"
for protein-schematic), and subsequent merges. Note that functionally 
speaking, the jbrowse and protein-schematic versions of the production
branches don't really get used for anything, as the docker images are 
built from the release branches, and the staging branches only serve to 
preserve changes from one release branch to the next.

To implement the move to production, for GBrowse all that needs to happen
is a pull into the production branch checkout that is set up to serve
GBrowse and restarting apache.


Important paths on the server
=============================

Obviously, in the ubuntu user's home directory are staging and production
directories.

/etc/apache2/sites-available - contains apache VIRTUALHOST configs for GBrowse, GBrowse_syn, and JBrowse.  This should be in the repo somewhere but currently are not.

/etc/apache2/conf-available - more apache configs for GBrowse where paths and aliases are set.

/usr/share/perl5/Bio/Graphics/Browser2 - where the perl code for GBrowse resides.  Yes, I have edited this manually to fix bugs even though it's under apt control.


