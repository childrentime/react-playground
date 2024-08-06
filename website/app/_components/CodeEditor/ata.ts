import { setupTypeAcquisition } from '@typescript/ata'
import ts from 'typescript';

export function createATA(onDownloadFile: (code: string, path: string) => void) {
  const ata = setupTypeAcquisition({
    projectName: 'my-ata',
    typescript: ts,
    logger: console,
    delegate: {
      receivedFile: (code, path) => {
        onDownloadFile(code, path);
      }
    },
  })

  return ata;
}
