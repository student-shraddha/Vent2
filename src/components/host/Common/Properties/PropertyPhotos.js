import React, { useRef, useState } from "react";
import CommonButton from "../Buttons/CommonButton";
import PlusSvg from "../../utils/Images/PlusSvg";
import Image from "next/image";
import CloseSvg from "../../utils/Images/CloseSvg";
import axiosInstance from "@/utils/axiosInstance";
import { successtoast, errortoast } from "@/components/host/Common/Toastify";
import LoaderSVG from "../../utils/Images/LoaderSVG";
import ErrorBlock from "../ErrorBlock";

function PropertyPhotos({ onSave, data, setData }) {

  const [isSubmitDisabled, setIsSubmitDisabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [errorFields, setErrorFields] = useState({

    imageUrl: "",
    otherImageUrls: "",
  });

  // For Property image
  const singleInputRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState({ preview: data?.imageUrl, raw: "" });


  const handleImageClick = () => {
    singleInputRef.current.click();
  };


  function imageSize(url) {
    const img = document.createElement("img");

    const promise = new Promise((resolve, reject) => {
      img.onload = () => {
        // Natural size is the actual image size regardless of rendering.
        // The 'normal' `width`/`height` are for the **rendered** size.
        const width = img.naturalWidth;
        const height = img.naturalHeight;

        // Resolve promise with the width and height
        resolve({ width, height });
      };

      // Reject promise on error
      img.onerror = reject;
    });

    // Setting the source makes it start downloading and eventually call `onload`
    img.src = url;

    return promise;
  }

  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];

    const imageDimensions = await imageSize(URL.createObjectURL(selectedFile));
    const size = Number((selectedFile.size / 1024 / 1024).toFixed(2));

    let imageUrlError = "";
    if (imageDimensions.width < 1024 || imageDimensions.height < 768) {
      imageUrlError = "Minimum photo resolution required is 1024 x 768 px"
    } else if (size > 2) {
      imageUrlError = "Single photo size exceeded 2 MB"
    }

    setSelectedImage({ preview: URL.createObjectURL(selectedFile), raw: selectedFile, hasError: imageUrlError.length, size: size });
    setErrorFields({
      ...errorFields,
      imageUrl: imageUrlError
    });
  };


  // For Other image
  const OtherImagesInputRef = useRef(null);
  const [selectedOtherImages, setSelectedOtherImages] = useState(
    (data?.otherImageUrls && data?.otherImageUrls.length ?
      data?.otherImageUrls.map((img) => { return { preview: img, raw: "" } }) : []
    )
  );

  const handleOtherImageClick = () => {
    OtherImagesInputRef.current.click();
  };

  const handleOtherImageChange = async (e) => {

    const otherImages = Array.from(e.target.files);
    const otherImageUrls = await Promise.all(otherImages.map(async (image, i) => {
      const imageDimensions = await imageSize(URL.createObjectURL(image));
      const size = Number((image.size / 1024 / 1024).toFixed(2));

      let imageUrlError = "";
      if (imageDimensions.width < 1024 || imageDimensions.height < 768) {
        imageUrlError = "Minimum photo resolution required is 1024 x 768 px"
      } else if (size > 2) {
        imageUrlError = "Single photo size exceeded 2 MB"
      }
      return { preview: URL.createObjectURL(image), raw: image, error: imageUrlError, size: size }
    }));
    setSelectedOtherImages([...selectedOtherImages, ...otherImageUrls]);
  };

  const removeOtherImage = (index) => {
    const otherImages = [...selectedOtherImages];
    otherImages.splice(index, 1);
    setSelectedOtherImages(otherImages);
  }

  const handleSubmit = async () => {

    //to make button disabled
    setIsSubmitDisabled(true);
    setIsLoading(true);

    let isValid = true;
    let imageUrlError = null;
    let otherImageUrlsError = null;

    if (!selectedImage?.preview) {
      imageUrlError = "Please select property image";
    } else if (selectedImage.hasError) {
      imageUrlError = "Invalid image founded";
    }

    if (selectedOtherImages.length < 10) {
      otherImageUrlsError = "Please select at least 10 other images";
    } else if (selectedOtherImages.filter(i => i.error).length) {
      otherImageUrlsError = "Invalid images founded";
    }

    if (!imageUrlError && !otherImageUrlsError) {
      var total_other_images = selectedOtherImages.reduce((accum, item) => accum + item.size, 0)

      let total_size = total_other_images + selectedImage.size;
      if (total_size > 30) {
        otherImageUrlsError = "Total size cannot exceed 30 MB.";
      }
    }


    if (imageUrlError || otherImageUrlsError) {
      isValid = false;
    }


    setErrorFields({
      ...errorFields,
      imageUrl: imageUrlError,
      otherImageUrls: otherImageUrlsError,
    });

    if (!isValid) {
      errortoast({ message: "Please fill all the required fields" });

      //to make button disabled
      setIsSubmitDisabled(false);
      setIsLoading(false);
      return false;
    }

    if (selectedImage.preview) {
      if (selectedImage.raw) {
        const file_url = await uploadPropertyImage();
        setData((prev) => {
          return { ...prev, imageUrl: file_url }
        });
      }

    }

    if (selectedOtherImages.length) {
      const file_urls = await uploadPropertyOtherImages();
      setData((prev) => {
        return { ...prev, otherImageUrls: file_urls }
      });
    }


    setIsSubmitDisabled(false);
    setIsLoading(false);
    // After validation done, can submit step
    onSave();//////
  }

  const uploadPropertyImage = async () => {

    const formdata = new FormData()
    formdata.append('file', selectedImage.raw)

    const response = await axiosInstance({
      url: `/v1/media-upload/upload-single-file`,
      method: "POST",
      data: formdata
    }).then((res) => {
      return res?.data?.data?.file_url
    }).catch((err) => {
      errortoast({ message: err.data.data.message })
    });
    return response
  }

  const uploadPropertyOtherImages = async () => {

    const formdata = new FormData()
    const images = []
    selectedOtherImages.map((i, inx) => {
      if (i?.raw)
        formdata.append('file', i.raw)
      else images.push(selectedOtherImages[inx].preview)
    })
    if (images.length != selectedOtherImages.length) {
      await axiosInstance({
        url: `/v1/media-upload/upload-multiple-file`,
        method: "POST",
        data: formdata
      }).then((res) => {
        let finalimage = res.data.data?.file_url.map((i) => {
          images.push(i)
          return i
        });
      }).catch((err) => {
        errortoast({ message: err?.data?.data?.message })
      });
    }
    return images
  }


  return (
    <>
      <div className="w-full h-auto flex flex-col items-center justify-start pt-3 px-2.5 ">
        <div className="w-full">
          <div>
            <div className="text-black  font-semibold text-xl font-Mulish">
              Photos*
            </div>
          </div>

          {/* <div className="font-Mulish font-normal text-primary-baseGray text-sm mt-3">
            Add at least 10 photos of your property. You can reorder the photos
            by dragging. Minimum photo resolution required is 1024 x 768 px. The
            single photo size cannot exceed 2 MB. For every time you upload in
            bulk the total size cannot exceed 30 MB.
          </div> */}

          <div className="font-Mulish font-normal text-primary-baseGray text-sm mt-3">
            Add at least 10 photos of your property. Minimum photo resolution required is 1024 x 768 px. The
            single photo size cannot exceed 2 MB. For every time you upload in
            bulk the total size cannot exceed 30 MB.
          </div>

          <div className=" mt-4 ">
            <input type="file" className="hidden" ref={singleInputRef} onChange={handleFileChange} />
            <div className="w-full h-full relative">
              {selectedImage?.preview ? (
                <div>
                  <div className="font-medium text-lg mb-2">Property Image</div>
                  <div className="grid grid-cols-3 gap-2">
                    <Image
                      src={selectedImage?.preview}
                      alt="selected"
                      width={0}
                      height={0}
                      sizes="100vw"
                      className="w-full h-auto cursor-pointer rounded-2"
                      onClick={handleImageClick}
                    />
                  </div>
                </div>
              ) : (
                <CommonButton
                  className={`bg-primary-baseRed font-Nunito text-white text-base font-bold px-4 py-2 h-10 cursor-pointer rounded-lg border transition flex items-center gap-2`}
                  onClick={handleImageClick}
                >
                  <PlusSvg fill={'fill-white'} width={16} height={16} /> <span>Add Photo</span>
                </CommonButton>
              )}

              {errorFields?.imageUrl && <ErrorBlock>{errorFields?.imageUrl}</ErrorBlock>}
            </div>
          </div>

          <div className=" mt-4 ">
            <input type="file" className="hidden" ref={OtherImagesInputRef} onChange={handleOtherImageChange} multiple />
            <div className="w-full h-full relative">
              {selectedOtherImages.length ? (
                <div>
                  <div className="font-medium text-lg mb-2">Other Images</div>
                  <div className="grid grid-cols-3 gap-2">
                    {selectedOtherImages.map((i, inx) =>
                      <div className="relative" key={inx}>
                        <Image
                          src={i.preview}
                          alt="selected"
                          width={0}
                          height={0}
                          sizes="100vw"
                          className="w-full h-auto rounded-2"
                        />
                        <div className="absolute bg-white cursor-pointer flex h-8 items-center justify-center right-2 rounded-full top-2 w-8" onClick={() => { removeOtherImage(inx) }}>
                          <CloseSvg className={'fill-black'} />
                        </div>
                        {i?.error && <ErrorBlock>{i?.error}</ErrorBlock>}
                      </div>

                    )}
                  </div>
                </div>
              ) : (
                ""
              )}

            </div>
            <div className="mt-3">
              <CommonButton
                className={`bg-primary-baseRed font-Nunito text-white text-base font-bold px-4 py-2 h-10 cursor-pointer rounded-lg border transition flex items-center gap-2`}
                onClick={handleOtherImageClick}
              >
                <PlusSvg fill={'fill-white'} width={16} height={16} /> <span>Add Other Images</span>
              </CommonButton>
            </div>
            {errorFields?.otherImageUrls && <ErrorBlock>{errorFields?.otherImageUrls}</ErrorBlock>}
          </div>



          <div className="w-full h-auto mt-5 flex justify-center ">
            {/* <button className="bg-primary-baseGray text-white  w-1/4 h-[3.125rem] py-2 px-4 rounded text-base border-none" onClick={handleSubmit}>
              Save & Next
            </button> */}

            <CommonButton
              className="bg-[#828282] text-[#FFFFFF] w-1/4 py-2 px-4 rounded text-base border-none"
              disabled={isSubmitDisabled}
              onClick={handleSubmit}
            >
              {isLoading ? (
                <>
                  <LoaderSVG />
                  <span>Saving...</span>
                </>
              ) : " Save & Next"}
            </CommonButton>
          </div>
        </div>
      </div >
    </>
  );
}

export default PropertyPhotos;
