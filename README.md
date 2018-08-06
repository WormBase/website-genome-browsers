This is the WormBase website-genome-browsers repository.

It contains the configuration files for GBrowse for the last several releases
and the build tools and json configuration files for JBrowse.

Typical build procedure
=======================

1. After GFF files are available on dev server, create a branch of this repo
for each JBrowse and GBrowse builds and clone it into a space
with room to build (currently, a jbrowse build takes about 30GB).

2. Build GBrowse config files:

a. Run website-admin/update/staging/steps/create_gbrowse_configuration.pl 
    with --release WSnumber and --path pointing at the new git clone,
    new_gbrowse_release_clone/gbrowse.  This process will take a while
    but generally less than 30 minutes.

b. Add, commit and push the newly created release directory as well as all
    of the updated symlinks in the main directory. The remaining tasks
    will take place on the gbrowse.wormbase.org server.

3. Build JBrowse.  This is a much more involved process at the moment.

a. Create a shell script to run the make_jbrowse.pl script for each species.
The lines will look something like

      make_jbrowse.pl --conf c_elegans.jbrowse.conf --quiet --species c_japonica_PRJNA12591

Note the the the "c_elegans.jbrowse.conf" comes from the repo, at
website-genome-browsers/jbrowse/conf/c_elegans.jbrowse.conf. I usually
make a local copy to update the path to the fresh jbrowse and the release
number.  Don't forget to add a "simple" line to the build shell script, like

      make_jbrowse.pl --conf c_elegans.jbrowse.conf --quiet --simple

This makes the config for the the gene page instance of jbrowse.

**Add a note about building the 'old modencode' jbrowse too!**

b. Run the build script inside a screen process.  It will take a while
    to run, generally in the ballpark of 12 hours.

4. Transfer the GBrowse build results to the gbrowse.wormbase.org
   server's staging section:

a. In gbrowse.wormbase.org:staging/gbrowse/website-genome-browsers, 
    checkout the release version branch for gbrowse. Restart apache2
    so that it will reread the config files.

b. Once you're convinced that this build is good, create a pull request
    to merge the release version branch into the staging branch.

c. Checkout the staging branch on the gbrowse server.

5. Transfer the JBrowse build results to the gbrowse.wormbase.org
   server's staging section:

a. Use rsync to transfer the JBrowse build directory (from "tools" down)
    to the gbrowse server, like this:

    rsync -av 10.0.0.172:/home/scain/scain/266_build/jbrowse_build/jbrowse/ .

It should be done into a temp or versioned directory, like '266_jbrowse'.

b. Change the 'tools' symlink in /home/ubuntu/staging/jbrowse/ to point
    at the tools directory just rsync'ed.

c. Test the JBrowse release in a browser with caching disabled to make
    sure that the new code and data are used.

d. Note that most of the time, there is no need to update the jbrowse
    git repo, but be careful to be sure that's true. The only release
    specific thing that needs to be done is to update the release version
    in the index.html file, which is easy to do manually.


Moving from staging to production
=================================

Before the move, the pull requests should be made from the build-specific
branches into the staging branches ("staging" for GBrowse, "jbrowse-staging"
for JBrowse), and those should get pulled into staging with subsequent merges. 
See the section above for more on that.  At some point after that, right
before the move to production, there should be pull requests from staging
into the production branches ("production" for GBrowse,
"jbrowse-production" for JBrowse), and a subsequent merges.

To implement the move to production, for GBrowse all that needs to happen
is a pull into the production branch checkout that is set up to serve
GBrowse and restarting apache.

For JBrowse, all that needs to happen is to update the "tools" link in 
/home/ubuntu/production/jbrowse to point at the appropriate version of the
tools directory in /home/ubuntu/staging/jbrowse.  Note that this means there
is always only one copy of the JBrowse data on the server, and it's in the
staging directory.  The only thing that happens for production is to update
the tools link.

