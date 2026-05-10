const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const avatarPath = path.join(root, "assets", "files", "khuong-binh-avatar.jpg");
const outputPath = path.join(root, "assets", "files", "khuong-binh.vcf");

if (!fs.existsSync(avatarPath)) {
  console.error("Missing avatar file:", avatarPath);
  process.exit(1);
}

const avatarBase64 = fs.readFileSync(avatarPath).toString("base64");

function foldBase64Property(prefix, base64) {
  const maxFirstLine = 74 - prefix.length;
  const chunks = [];
  chunks.push(prefix + base64.slice(0, maxFirstLine));

  let rest = base64.slice(maxFirstLine);
  while (rest.length > 0) {
    chunks.push(" " + rest.slice(0, 73));
    rest = rest.slice(73);
  }

  return chunks;
}

const lines = [
  "BEGIN:VCARD",
  "VERSION:3.0",
  "N:Bình;Khương;;;",
  "FN:Khương Bình",
  "ORG:Quản trị kinh doanh & giải pháp số thực chiến",
  "TITLE:Chuyên gia Phát triển thị trường & Công cụ số",
  "TEL;TYPE=CELL,VOICE:0902964685",
  "URL:https://www.ungdungthongminh.shop",
  "URL:https://www.thehairlab.top",
  "URL:https://www.truyendongcongnghiep.top",
  "NOTE:Kết hợp kinh nghiệm quản lý kinh doanh và công cụ số hỗ trợ bán hàng, phân phối và vận hành.",
  ...foldBase64Property("PHOTO;ENCODING=b;TYPE=JPEG:", avatarBase64),
  "END:VCARD"
];

fs.writeFileSync(outputPath, lines.join("\r\n") + "\r\n", "utf8");

console.log("Generated:", outputPath);
console.log("Avatar size:", fs.statSync(avatarPath).size, "bytes");
console.log("VCF size:", fs.statSync(outputPath).size, "bytes");
