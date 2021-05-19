console.log('hello');

  const protein = 'JC8.10a';
  let lines = async function featList(protein) {
    const {TabixIndexedFile} = require('@gmod/tabix');
    const {LocalFile,RemoteFile,BlobFile} = require('generic-filehandle');

  // use a remote file or other filehandle, note RemoteFile comes from https://github.com/GMOD/generic-filehandle
    const remoteTbiIndexed = new TabixIndexedFile({
        filehandle: new RemoteFile('https://s3.amazonaws.com/agrjbrowse/test/c_elegans.PRJNA13758.WS280.protein_annotation.sorted.gff3.gz'),
        tbiFilehandle: new RemoteFile('https://s3.amazonaws.com/agrjbrowse/test/c_elegans.PRJNA13758.WS280.protein_annotation.sorted.gff3.gz.tbi') // can also be csiFilehandle
  });

    const lines = [];
    await tbiIndexed.getLines(protein,0,undefined, function(line, fileOffset) {
      console.log(line);
      lines.push(line);
    });
    return lines;
}

  console.log(lines[0]);
  console.log(lines[1]);
