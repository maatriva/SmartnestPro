import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.join(__dirname, 'public');
const sourceFavicon = path.join(publicDir, 'MaatrivaFavicon.png');

async function generateFavicons() {
  console.log('Checking favicons...');
  try {
    if (!fs.existsSync(sourceFavicon)) {
      console.log(`Source favicon not found at: ${sourceFavicon}`);
      return;
    }

    const sharpModule = await import('sharp');
    const sharp = sharpModule.default;

    const buffer = fs.readFileSync(sourceFavicon);

    // 1. favicon-16x16.png
    await sharp(buffer)
      .resize(16, 16)
      .png()
      .toFile(path.join(publicDir, 'favicon-16x16.png'));

    // 2. favicon-32x32.png
    await sharp(buffer)
      .resize(32, 32)
      .png()
      .toFile(path.join(publicDir, 'favicon-32x32.png'));

    // 3. apple-touch-icon.png (180x180)
    await sharp(buffer)
      .resize(180, 180)
      .png()
      .toFile(path.join(publicDir, 'apple-touch-icon.png'));

    // 4. android-chrome-192x192.png
    await sharp(buffer)
      .resize(192, 192)
      .png()
      .toFile(path.join(publicDir, 'android-chrome-192x192.png'));

    // 5. android-chrome-512x512.png
    await sharp(buffer)
      .resize(512, 512)
      .png()
      .toFile(path.join(publicDir, 'android-chrome-512x512.png'));

    // 6. favicon.ico
    await sharp(buffer)
      .resize(32, 32)
      .png()
      .toFile(path.join(publicDir, 'favicon.ico'));

    console.log('Favicon generation complete!');
  } catch (err) {
    console.warn('Favicon generation note:', err.message);
  }
}

generateFavicons();
