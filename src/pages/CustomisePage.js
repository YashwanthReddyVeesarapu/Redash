import React, { useEffect, useRef, useState } from "react";
import MainLayout from "../layouts/MainLayout";

import background_tshirt from "../assets/background-tshirt.png";

import { fabric } from "fabric"; // v5

import "./customise.scss";
import {
  Button,
  FormControl,
  Input,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";

const globalObject = [
  {
    colorName: "Red",
    colorCode: "#b51717",
    shirtImage: "",
  },
  { colorName: "Royal Blue", colorCode: "#20419A", shirtImage: "" },
  { colorName: "Orange", colorCode: "#ff7700", shirtImage: "" },
];

const designSizes = {
  1: { x: 8.5, y: 11 },
  2: { x: 11, y: 8.5 },
  3: { x: 11, y: 17 },
};

const CustomisePage = () => {
  const canvasEl = useRef(null);

  const [image, setImage] = useState("");

  const [dsize, setDSize] = useState(1);
  const [dimen, setDimen] = useState("");
  const [isbgRemoved, setIsBgRemoved] = useState(false);
  // const [canvas, setCanvas] = useState(null);

  // useEffect(() => {
  //   if (!canvas) {
  //     setCanvas(canvasEle);
  //   }
  // }, []);

  useEffect(() => {
    let canvas = new fabric.Canvas(canvasEl.current);

    // if (!image) {
    //   canvas.clear();
    // }
    //  Create a new image that can be used in Fabric with the URL
    canvas.setHeight(dimen.y * (9.6 * 2));
    canvas.setWidth(dimen.x * (9.6 * 2));
    if (image) {
      let imageUrl = URL.createObjectURL(image);

      fabric.Image.fromURL(imageUrl, function (img) {
        // Define the image as background image of the Canvas
        img.scaleToWidth(150);

        canvas.add(img);
      });
    }

    return () => {
      // updateCanvasContext(null);
      canvas.dispose();
    };
  }, [image, dimen]);

  useEffect(() => {
    if (dsize == "") return;

    setDimen(designSizes[dsize]);
  }, [dsize]);

  const removeBg = async (img) => {
    // const outputFile = `${__dirname}/out/img-removed-from-file.png`;
    let API_KEY = "Rn1PbjhV5MbZvVahFJ7jfzoh";
  };

  return (
    <MainLayout>
      <div className="customise">
        <div className="section">
          <h2>Getting Started</h2>

          <FormControl>
            <InputLabel id="design-size-label">Select Design Size</InputLabel>

            <Select
              labelId="design-size-label"
              id="design-size"
              label="Select Design Size"
              value={dsize && dsize}
              onChange={(e) => setDSize(e.target.value)}
            >
              <MenuItem value={1}>Normal </MenuItem>
              <MenuItem value={2}>Normal (Landscape)</MenuItem>
              <MenuItem value={3}>Large</MenuItem>
            </Select>
          </FormControl>

          <FormControl>
            <InputLabel id="shirt-color-label">Color</InputLabel>

            <Select
              id="shirt-color"
              onChange={(e) =>
                (document.getElementById("tshirt-div").style.backgroundColor =
                  e.target.value)
              }
              label="Color"
              labelId="shirt-color-label"
              defaultValue={"#fff"}
            >
              <MenuItem value="#fff">White</MenuItem>
              <MenuItem value="#000">Black</MenuItem>
              <MenuItem value="#f00">Red</MenuItem>
              <MenuItem value="#008000">Green</MenuItem>
              <MenuItem value="#ff0">Yellow</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className="smiddle">
          <div id="tshirt-div">
            <img id="tshirt-backgroundpicture" src={background_tshirt} />
          </div>
          <canvas
            id="canvas-container"
            width="200"
            height="400"
            ref={canvasEl}
            style={{ border: "1px solid black" }}
          ></canvas>
        </div>
        <div className="section">
          <Input type={"file"} onChange={(e) => setImage(e.target.files[0])} />
          <Button
            disabled={isbgRemoved}
            variant={"contained"}
            onClick={() => removeBg()}
          >
            Remove background
          </Button>
        </div>
      </div>
    </MainLayout>
  );
};

export default CustomisePage;
