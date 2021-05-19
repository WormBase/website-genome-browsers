import { TabixIndexedFile } from "@gmod/tabix";
import { LocalFile, RemoteFile, BlobFile } from "generic-filehandle";
import fetch from "cross-fetch";

console.log("hello");

const protein = "JC8.10a";
(async () => {
  const lines = await featList(protein);
  console.log(lines.slice(0, 5));
})();

async function featList(protein) {
  // use a remote file or other filehandle, note RemoteFile comes from https://github.com/GMOD/generic-filehandle
  const tbiIndexed = new TabixIndexedFile({
    filehandle: new RemoteFile(
      "https://s3.amazonaws.com/agrjbrowse/test/c_elegans.PRJNA13758.WS280.protein_annotation.sorted.gff3.gz",
      { fetch }
    ),
    tbiFilehandle: new RemoteFile(
      "https://s3.amazonaws.com/agrjbrowse/test/c_elegans.PRJNA13758.WS280.protein_annotation.sorted.gff3.gz.tbi",
      { fetch }
    ),
  });

  const lines = [];
  await tbiIndexed.getLines(protein, 0, undefined, function (line, fileOffset) {
    //console.log(line);
    lines.push(line);
  });
  return lines;
}
