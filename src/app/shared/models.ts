export enum DemoKind {
  DirectUpload = 'direct-upload',
  ModalConfirm = 'modal-confirm',
}

export type DemoStatus = 'idle' | 'recording' | 'processing' | 'uploading' | 'uploaded' | 'error';

export interface DemoContext {
  title: string;
  kind: DemoKind;
  setStatus: (s: DemoStatus) => void;
  setProgress: (p: number) => void;
  enqueue: (fakeFileId: string) => void;
}
