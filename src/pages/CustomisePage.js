import React, { useEffect, useRef, useState } from "react";
import MainLayout from "../layouts/MainLayout";

import background_tshirt_front from "../assets/background-tshirt.png";
import background_tshirt_back from "../assets/background-tshirt_back.png";

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
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/actions";
import html2canvas from "html2canvas";

const globalObject = {
  white: "#fff",
  black: "#000",
  red: "#f00",
  green: "#008000",
  yellow: "#ff0",
};

const designSizes = {
  1: { x: 8.5, y: 11 },
  2: { x: 11, y: 8.5 },
  3: { x: 11, y: 17 },
};

const CustomisePage = () => {
  const canvasEl = useRef(null);

  const [image, setImage] = useState("");

  const [dsize, setDSize] = useState(3);
  const [side, setSide] = useState("front");
  const [dimen, setDimen] = useState("");
  const [isbgRemoved, setIsBgRemoved] = useState(false);
  const [clr, setClr] = useState("white");

  const [resultUrl, setResultUrl] = useState();

  const dispatch = useDispatch();

  const navigate = useNavigate();
  // const [canvas, setCanvas] = useState(null);

  // useEffect(() => {
  //   if (!canvas) {
  //     setCanvas(canvasEle);
  //   }
  // }, []);

  function toDataURL(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
      var reader = new FileReader();
      reader.onloadend = function () {
        callback(reader.result);
      };
      reader.readAsDataURL(xhr.response);
    };
    xhr.open("GET", url);
    xhr.responseType = "blob";
    xhr.send();
  }

  useEffect(() => {
    let canvas = new fabric.Canvas(canvasEl.current);
    let imageElement = document.getElementById("tshirt-backgroundpicture");

    if (side == "front") {
      imageElement.src = background_tshirt_front;
    } else if (side == "back") {
      imageElement.src = background_tshirt_back;
    }

    // if (!image) {
    //   canvas.clear();
    // }
    //  Create a new image that can be used in Fabric with the URL
    canvas.setHeight(dimen.y * (9.6 * 2));
    canvas.setWidth(dimen.x * (9.6 * 2));
    if (image) {
      let imageUrl = URL.createObjectURL(image);

      toDataURL(imageUrl, function (dataUrl) {
        setResultUrl(dataUrl);
      });

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
  }, [image, dimen, side]);

  useEffect(() => {
    if (dsize == "") return;

    setDimen(designSizes[dsize]);
  }, [dsize]);

  const cart = async () => {
    let canvasImg = canvasEl.current.toDataURL("image/png");
    let img = await html2canvas(document.querySelector("#placer")).then(
      (canvas) => {
        let data = canvas.toDataURL("image/jpg");
        return data;
      }
    );

    const cartItem = {
      _id: "RA0001",
      name: "Custom",
      quantity: "1",
      color: clr,
      price: "30",
      size: "S",
      brand: "REDASH",
      img: img,
      originalImg: resultUrl,
    };

    dispatch(addToCart(cartItem));
  };

  return (
    <MainLayout>
      <div className="customise">
        <div className="section">
          <h2>Getting Started</h2>

          {/* <FormControl style={{ color: "white" }}>
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
              <MenuItem value={3}>Normal</MenuItem>
            </Select>
          </FormControl> */}

          <FormControl>
            <InputLabel id="shirt-color-label">Color</InputLabel>

            <Select
              id="shirt-color"
              onChange={(e) => {
                setClr(e.target.value);
                document.getElementById("tshirt-div").style.backgroundColor =
                  globalObject[e.target.value];
              }}
              label="Color"
              labelId="shirt-color-label"
              defaultValue={"white"}
            >
              <MenuItem value="white">White</MenuItem>
              <MenuItem value="black">Black</MenuItem>
              <MenuItem value="red">Red</MenuItem>
              <MenuItem value="green">Green</MenuItem>
              <MenuItem value="yellow">Yellow</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div id="placer" className="smiddle">
          <div id="tshirt-div">
            <img id="tshirt-backgroundpicture" />
          </div>
          <canvas
            id="canvas-container"
            width="200"
            height="400"
            ref={canvasEl}
            style={{ border: "1px solid gray" }}
          ></canvas>
        </div>
        <div className="section">
          <Input
            type={"file"}
            inputProps={{ accept: "image/png, image/jpg" }}
            onChange={(e) => setImage(e.target.files[0])}
          />
          {/* <Button
            disabled={isbgRemoved}
            variant={"contained"}
            onClick={() => removeBg()}
          >
            Remove background
          </Button> */}

          <Button
            disabled={isbgRemoved}
            variant={"contained"}
            onClick={() => cart()}
          >
            I am Done - Add to cart
          </Button>
        </div>
      </div>
    </MainLayout>
  );
};

export default CustomisePage;
