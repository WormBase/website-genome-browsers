console.log("hello");

const protein = "JC8.10a";
let lines;
try {
  lines = featList(protein);
} catch (e) {
  console.log(e);
}

console.log(lines[0]);
console.log(lines[1]);



 async function featList(protein) {
  const { TabixIndexedFile } = require("@gmod/tabix");
  const { LocalFile, RemoteFile, BlobFile } = require("generic-filehandle");
  const { fetch } = require("node-fetch");

  // use a remote file or other filehandle, note RemoteFile comes from https://github.com/GMOD/generic-filehandle
  let remoteTbiIndexed;
//  try{
    remoteTbiIndexed = new TabixIndexedFile({
      filehandle: new RemoteFile(
        "https://s3.amazonaws.com/agrjbrowse/test/c_elegans.PRJNA13758.WS280.protein_annotation.sorted.gff3.gz",
        {fetch}
      ),
      tbiFilehandle: new RemoteFile(
        "https://s3.amazonaws.com/agrjbrowse/test/c_elegans.PRJNA13758.WS280.protein_annotation.sorted.gff3.gz.tbi",
        {fetch}
      ), // can also be csiFilehandle
    });
//  } catch (e) {
//    console.log(e);
//  }

  const lines = [];
  await tbiIndexed.getLines(protein, 0, undefined, function (line, fileOffset) {
    //console.log(line);
    lines.push(line);
  });
  return lines;
};
