import { faUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { ChangeEvent, ChangeEventHandler, useState } from "react";

const ImagePrompt = () => {
  const getBase64 = (file: any): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        if (reader.result == null) return;
        resolve(reader.result as string);
      };
      reader.onerror = (error) => reject(error);
    });
  };
  const [imgFile, setImgFile] = useState("");
  const handleFileUpload = async (e: ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    if (!target.files?.length) return;
    const file = target.files[0];
    const str = await getBase64(file);
    setImgFile(str);
    console.log(imgFile);
  };
  return (
    <div className="grid w-full grid-cols-[3fr_1fr] gap-2">
      <div className="rounded-lg bg-slate-200 p-8">
        <p>
          You can upload your image, neuronet will try to align with it's style
        </p>
      </div>
      <div
        style={{
          backgroundImage: `url(${imgFile})`,
          backgroundOrigin: "border-box",
          backgroundSize: "contain",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          filter: 'brightness(60%)'
        }}
        className="flex items-center justify-center rounded-lg bg-slate-200 p-8"
      >
        <label
          htmlFor="file-upload"
          className="relative cursor-pointer"
        >
          <FontAwesomeIcon className="text-center text-6xl" icon={faUpload} />
        </label>
        <input
          onChange={handleFileUpload}
          className="hidden"
          id="file-upload"
          type="file"
        />
      </div>
    </div>
  );
};

export default ImagePrompt;
