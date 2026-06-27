import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const imagesDir = path.join(__dirname, 'src', 'features', 'images');
const publicDir = path.join(__dirname, 'public');

const teamAvatars = [
  'Arghya.png',
  'Arman.png',
  'Kirtik.png',
  'Vishavjeet.png'
];

async function optimizeTeamAvatars() {
  console.log('Optimizing team avatars...');
  for (const avatar of teamAvatars) {
    const filePath = path.join(imagesDir, avatar);
    if (fs.existsSync(filePath)) {
      const stats = fs.statSync(filePath);
      console.log(`Original size of ${avatar}: ${(stats.size / 1024 / 1024).toFixed(2)} MB`);
      
      const buffer = fs.readFileSync(filePath);
      const optimizedBuffer = await sharp(buffer)
        .resize(400, 400, { fit: 'cover' })
        .png({ quality: 75, compressionLevel: 9 })
        .toBuffer();
        
      fs.writeFileSync(filePath, optimizedBuffer);
      const newStats = fs.statSync(filePath);
      console.log(`Optimized size of ${avatar}: ${(newStats.size / 1024).toFixed(2)} KB`);
    } else {
      console.warn(`File not found: ${filePath}`);
    }
  }
}

async function optimizeLargePublicAssets() {
  console.log('Optimizing large public assets...');
  const enterpriseCradle = path.join(publicDir, 'EnterpriseCradle.png');
  if (fs.existsSync(enterpriseCradle)) {
    const stats = fs.statSync(enterpriseCradle);
    console.log(`Original size of EnterpriseCradle.png: ${(stats.size / 1024 / 1024).toFixed(2)} MB`);
    
    const buffer = fs.readFileSync(enterpriseCradle);
    const optimizedBuffer = await sharp(buffer)
      .resize(800, 800, { fit: 'inside', withoutEnlargement: true })
      .png({ quality: 75, compressionLevel: 9 })
      .toBuffer();
      
    fs.writeFileSync(enterpriseCradle, optimizedBuffer);
    const newStats = fs.statSync(enterpriseCradle);
    console.log(`Optimized size of EnterpriseCradle.png: ${(newStats.size / 1024).toFixed(2)} KB`);
  }
  
  // Also optimize other JPEGs in src/features/images to be safe
  const jpegs = ['supportingParents.jpg', 'withParents.jpeg', 'withbaby.jpeg', 'withoutbaby.jpeg'];
  for (const jpeg of jpegs) {
    const filePath = path.join(imagesDir, jpeg);
    if (fs.existsSync(filePath)) {
      const stats = fs.statSync(filePath);
      console.log(`Original size of ${jpeg}: ${(stats.size / 1024).toFixed(2)} KB`);
      
      const buffer = fs.readFileSync(filePath);
      const optimizedBuffer = await sharp(buffer)
        .resize(1200, 800, { fit: 'inside', withoutEnlargement: true })
        .jpeg({ quality: 80, mozjpeg: true })
        .toBuffer();
        
      fs.writeFileSync(filePath, optimizedBuffer);
      const newStats = fs.statSync(filePath);
      console.log(`Optimized size of ${jpeg}: ${(newStats.size / 1024).toFixed(2)} KB`);
    }
  }
}

async function run() {
  try {
    await optimizeTeamAvatars();
    await optimizeLargePublicAssets();
    console.log('Image optimization complete!');
  } catch (error) {
    console.error('Error during image optimization:', error);
  }
}

run();
