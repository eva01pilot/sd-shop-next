'use client'
import dynamic from "next/dynamic";
import { MouseEventHandler, useState } from "react";
import GenerateForm from "../components/GenerateForm";
import ImagePrompt from "../components/ImagePrompt";
const ImageRedactor = dynamic(() => import("../components/ImageRedactor"), {
  ssr: false,
});

const CreateScreen = () => {
  const [images, setImages] = useState<string[]>([]);
  const [textPrompt, setTextPrompt] = useState('');
  const [imagePrompt, setImagePrompt] = useState('');
  const addImage:MouseEventHandler<HTMLButtonElement> = async(e) => {
    e.preventDefault()
    setImages([...images, "mikuglitch.png"]);
    console.log(images);
  };
  return (
    <main className="flex flex-col xl:flex-row overflow-x-hidden bg-slate-600">
      <section className="flex h-[calc(100vh-5rem)] flex-col w-screen  items-center justify-center xl:w-2/5 p-8">
        <div className="bg-slate-200 p-4 rounded-lg shadow-2xl w-full flex my-2 items-center flex-col ">
          <h1 className="text-2xl py-4">Generate whatever something</h1>
          <GenerateForm textPromptChange={(e)=>setTextPrompt(e.currentTarget.value)} generate={addImage}/>
        </div>
        <div className="flex flex-row self-start w-full">
          <ImagePrompt />
        </div>
      </section>
      <section className="h-[calc(100vh-5.11rem)] w-screen xl:w-2/3">
        <ImageRedactor images={images} />
      </section>
    </main>
  );
};

export default CreateScreen;

