export type IRawData = string | ArrayBuffer | null;
type Callback = (event: ProgressEvent<FileReader>, reader: FileReader) => void;

export function getImageRawData(image: File, callback: Callback): void {
    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.addEventListener('loadend', (event) => callback(event, reader));
}
