const fs = require('fs');
const path = require('path');

const DIST_DIR = path.resolve(__dirname, '../dist');
const CODE_WEIGHT = '0.5';

function scanHtmlFiles(dir, results = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name !== 'pagefind') scanHtmlFiles(fullPath, results);
    } else if (entry.name.endsWith('.html')) {
      results.push(fullPath);
    }
  }
  return results;
}

function addCodeWeights(html) {
  let blockCount = 0;
  let ignoredOpaqueBlocks = 0;
  const normalizedHtml = html.replace(/<div data-pagefind-weight="0\.5"(?=\s+class="language-)/g, '<div');
  const output = normalizedHtml.replace(/<pre([^>]*)>([\s\S]*?)<\/pre>/g, (match, attributes, content) => {
    blockCount += 1;
    let normalizedAttributes = attributes;

    if (!/data-pagefind-weight=/.test(normalizedAttributes)) {
      normalizedAttributes = ` data-pagefind-weight="${CODE_WEIGHT}"${normalizedAttributes}`;
    }

    const containsOpaqueData =
      /base64(?:,|;)/i.test(content) || /-----BEGIN (?:RSA |EC |OPENSSH )?(?:PUBLIC |PRIVATE )?KEY-----/i.test(content) || /[A-Za-z0-9+/=]{60,}/.test(content);

    if (containsOpaqueData) {
      if (!/data-pagefind-ignore(?:=|\s|$)/.test(normalizedAttributes)) {
        normalizedAttributes = ` data-pagefind-ignore${normalizedAttributes}`;
      }
      ignoredOpaqueBlocks += 1;
    }

    return `<pre${normalizedAttributes}>${content}</pre>`;
  });
  return { output, blockCount, ignoredOpaqueBlocks };
}

function main() {
  if (!fs.existsSync(DIST_DIR)) {
    throw new Error(`VuePress output directory does not exist: ${DIST_DIR}`);
  }

  const files = scanHtmlFiles(DIST_DIR);
  let changedFiles = 0;
  let weightedBlocks = 0;
  let ignoredOpaqueBlocks = 0;

  for (const file of files) {
    const html = fs.readFileSync(file, 'utf8');
    const { output, blockCount, ignoredOpaqueBlocks: ignoredBlocks } = addCodeWeights(html);
    weightedBlocks += blockCount;
    ignoredOpaqueBlocks += ignoredBlocks;
    if (output === html) continue;
    fs.writeFileSync(file, output, 'utf8');
    changedFiles += 1;
  }

  console.log(
    `Prepared ${files.length} HTML files for Pagefind: ` +
      `${weightedBlocks} code blocks weighted, ${ignoredOpaqueBlocks} opaque-data blocks ignored, ` +
      `${changedFiles} files changed.`
  );
}

main();
