import cornerstoneDICOMImageLoader from "@cornerstonejs/dicom-image-loader"


export async function CreateFromFile() {
    const req = await fetch('/dcm1.dcm')
    const blob = await req.blob()
    const imageId = cornerstoneDICOMImageLoader.wadouri.fileManager.add(blob)
    await cornerstoneDICOMImageLoader.wadouri.loadImage(imageId).promise
    return [imageId];
}