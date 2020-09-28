This plugin provides several glyphs at use both at WormBase.org and AllianceGenome.org.

They include:

AntisenseRNAGene.js   - not really used, superseded by NoncodingGene.js
BareNoncodingGene.js   - not really used, superseded by NoncodingGene.js
Diamond.js            - a better diamond glyph than the default
DownTriangle.js       - a down pointing triangle
ExonTranscript.js
IntronGene.js
LabelFloatBox.js      - a segment glyph that provides a label that floats on the left edge of the screen
LeftTriangle.js       - a left pointing triangle
LincRNAGene.js        - not really used, superseded by NoncodingGene.js
LinkedEST.js
MiRNAGene.js
MultipleVariantAllele.js - shows variants that belong to a single allele linked
NcRNAGene.js           - not really used, superseded by NoncodingGene.js
NoncodingGene.js       - A glyph to work like Gene.js but specifically for noncoding genes
NoncodingTranscript.js - A transcript glyph to work with NoncodingGene.js
PiRNAGene.js          - not really used, superseded by NoncodingGene.js
PreMiRNAGene.js       - not really used, superseded by NoncodingGene.js
PseudoGene.js         - not really used, superseded by NoncodingGene.js
RightTriangle.js      - a right pointing triangle
RRNAGene.js           - not really used, superseded by NoncodingGene.js
ScRNAGene.js          - not really used, superseded by NoncodingGene.js
SnoRNAGene.js         - not really used, superseded by NoncodingGene.js
SnRNAGene.js          - not really used, superseded by NoncodingGene.js
TRNAGene.js           - not really used, superseded by NoncodingGene.js
WBGene.js             - a gene glyph that deals with noncoding transcripts better than the default Gene glyph

Notes about a few of these:

The single or small bp glyphs (Diamond, and the three triangle glyphs) are intended to represent things that occur over small region (one or a few bases) like SNPs, insertions, start and end sites and the like.  They have a minimum width, so when viewing them zoomed out, they will appear "bigger" that the actual space they should take up to make them visible.

MultipleVariantAllele: This is intended to show an allele that has multiple variants as child features. It will reresent the child variants with glyphs that are appropriate for their type: point_mutation and SNP would be a diaond, insersions would be a down triangle and other types would be boxes.  These glyphs would be joined with a dashed line to indication their relationship.

WBGene: works very similarly to the Gene glyph provided with JBrowse with the notable exception of how it handles non-coding transcripts. The orginal Gene glyph would just show a grey box for these transcripts. The WBGene glyph will show splicing information for these transcripts when it's available. 
