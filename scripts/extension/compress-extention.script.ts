import {EXTENSION_DIST_DIR, COMPRESSED_EXTENSION_DIST} from '../../config/environment/environment.config.js';
import {createWriteStream} from 'fs';
import archiver from 'archiver';

const compressExtention = () => {
  const outputStream = createWriteStream(COMPRESSED_EXTENSION_DIST);
  const archive = archiver('zip', {
    zlib: {
      level: 9
    }
  });

  outputStream.on('close', () => {
    console.log(archive.pointer() + ' total bytes');
    console.log('archiver has been finalized and the output file descriptor has closed.');
  });

  outputStream.on('end', () => {
    console.log('Data has been drained');
  });

  archive.on('warning', (err) => {
    if (err.code === 'ENOENT') {
      // log warning
      console.warn(err);
    } else {
      // throw error
      throw err;
    }
  });

  archive.on('error', (err) => {
    throw err;
  });

  archive.pipe(outputStream);

  archive.directory(EXTENSION_DIST_DIR, false);

  archive.finalize();
}

compressExtention();