import fse from 'fs-extra';
import {MANIFEST_DIST} from '../../config/environment/environment.config.js';
import {manifest} from '../../src/manifest/manifest';

const writeManifestFile = () => {
  fse.writeJSONSync(MANIFEST_DIST, manifest, {
    encoding: 'utf8'
  });
}

writeManifestFile();
