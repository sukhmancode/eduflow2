"use client";

import { useState, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import Image from "next/image";
import html2canvas from "html2canvas";

export default function CertificateGenerator() {
  const [name, setName] = useState("");
  const [rollNo, setRollNo] = useState("");
  const [showModal, setShowModal] = useState(false);
  const certRef = useRef<HTMLDivElement>(null);

  const handleGenerate = () => {
    if (name.trim() && rollNo.trim()) {
      setShowModal(true);
    } else {
      toast.error("Please fill out both fields.");
    }
  };
  const handleDownloadAsImage = async () => {
    if (!certRef.current) return;
  
    // Optional: Fix any unsupported color formats before rendering
    const fixColors = (element: HTMLElement) => {
      const all = element.querySelectorAll("*");
      all.forEach((el) => {
        const style = window.getComputedStyle(el);
        if (style.color.includes("oklch")) {
          (el as HTMLElement).style.color = "#000";
        }
        if (style.backgroundColor.includes("oklch")) {
          (el as HTMLElement).style.backgroundColor = "#fff";
        }
      });
    };
  
    fixColors(certRef.current);
  
    const canvas = await html2canvas(certRef.current);
  
    // Convert canvas to blob instead of data URL
    canvas.toBlob((blob) => {
      if (!blob) {
        toast.error("Failed to generate image.");
        return;
      }
  
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${name}_Certificate.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }, "image/png");
  };
  
  return (
    <div className="max-w-2xl mx-auto mt-10 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Certificate Generator</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            type="text"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            type="text"
            placeholder="Enter Roll Number"
            value={rollNo}
            onChange={(e) => setRollNo(e.target.value)}
          />
          <Button className="w-full" onClick={handleGenerate}>
            Generate Certificate
          </Button>
        </CardContent>
      </Card>

      {/* Certificate Modal */}
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Certificate Preview</DialogTitle>
          </DialogHeader>

          <div
            ref={certRef}
            className="bg-white p-10 border rounded-xl text-center"
            style={{ color: "#000", backgroundColor: "#fff" }} // Safe styles
          >
            <Image
              src="/gne.jpg"
              width={100}
              height={100}
              alt="gne logo"
              className="mx-auto mb-4"
            />
            <h2 className="text-3xl font-bold text-indigo-700 mb-4">
              Certificate of Achievement
            </h2>
            <p className="text-lg">This is to certify that</p>
            <h3 className="text-2xl font-semibold mt-2">{name}</h3>
            <p className="mt-2">Roll No: {rollNo}</p>
            <p className="mt-4 text-gray-600">
              has successfully completed the requirements.
            </p>
          </div>

          <Button className="mt-4 w-full" onClick={handleDownloadAsImage}>
            Download as Image
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
