This is the WormBase website-genome-browsers repository.

It contains the configuration files for GBrowse for the last several releases
and the build tools and json configuration files for JBrowse.

==Typical build procedure==

1. After GFF files are available on dev server, create a branch of this repo
for each JBrowse and GBrowse builds and clone it into a space
with room to build (currently, a jbrowse build takes about 30GB).

2. Build GBrowse config files:

2a. Run website-admin/update/staging/steps/create_gbrowse_configuration.pl 
    with --release WSnumber and --path pointing at the new git clone,
    new_gbrowse_release_clone/gbrowse.  This process will take a while
    but generally less than 30 minutes.

2b. Add, commit and push the newly created release directory as well as all
    of the updated symlinks in the main directory.

2c. Update the apache config /etc/apache2/sites-available/default to point 
    at the new config and restart apache.

3. Build JBrowse.  This is a much more involved process at the moment.

3a. Make a fresh install of JBrowse (unpack the zip file, run setup.sh)

3b. Create a shell script to run the make_jbrowse.pl script for each species.
The lines will look something like

      make_jbrowse.pl --conf c_elegans.jbrowse.conf --quiet --species c_japonica_PRJNA12591

Note the the the "c_elegans.jbrowse.conf" comes from the repo, at
website-genome-browsers/jbrowse/conf/c_elegans.jbrowse.conf. I usually
make a local copy to update the path to the fresh jbrowse and the release
number.  Don't forget to add a "simple" line to the build shell script, like

      make_jbrowse.pl --conf c_elegans.jbrowse.conf --quiet --simple

This makes the config for the the gene page instance of jbrowse.

3c. Run the build script inside a screen process.  It will take a while
    to run, generally in the ballpark of 12 hours.

3d. Update the symlink in /usr/local/wormbase to point at the new jbrowse
    directory.  Generally it's a good idea to keep a copy of the old symlink
    in case something goes south and you want to quickly revert.

==Moving from staging to production==

Before the move, the pull requests should be made from the build-specific
branches into the staging branches ("staging" for GBrowse, "jbrowse-staging"
for JBrowse), and those should get pulled into staging with subsequent merges. 
At some point after that, right before the move to production, there should be
pull requests from staging into the production branches ("production" for
GBrowse, "jbrowse-production" for JBrowse), and a subsequent merges.

To implement the move to production, for GBrowse all that needs to happen
is a pull into the production branch checkout that is set up to serve
GBrowse and restarting apache.

For JBrowse, it is again, slightly more complicated:

1. The source files for JBrowse and the data files need to be rsynced from 
the dev machine.  The command will look something like this:

  rsync -av scain@10.0.0.65:/usr/local/wormbase/website/scain/257_new_jbrowse/ .

This should be done in a screen process because it will take a few hours to
complete.

2. Issue a pull request in the JBrowse production branch checkout.

3. Update the symlink in /usr/local/wormbase to point at the new jbrowse
directory.  Save the old symlink in case you need to quickly revert.

