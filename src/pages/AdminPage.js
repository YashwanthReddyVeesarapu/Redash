import React, { useEffect, useState } from "react";
import AdminLayout from "../layouts/AdminLayout";

import {
  Button,
  Input,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";

import { apiInstance } from "../utils/apiInstance";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";

const AdminPage = () => {
  const [images, setImages] = useState();
  const [imagesUrlArray, setImagesUrlArray] = useState([]);
  const auth = getAuth();
  const navigate = useNavigate();

  const [finalImages, setFinalImages] = useState({});
  const [colors, setColors] = useState("");
  const [sizes, setSizes] = useState(["xs", "s", "m", "l", "xl"]);
  const [gender, setGender] = useState("female");

  const [launchDate, setLaunchDate] = useState();

  const [loading, setLoading] = useState(true);

  // onAuthStateChanged(auth, (user) => {
  //   setLoading(false);
  //   if (auth.currentUser?.email !== "hello@redash.us") {
  //     navigate("/");
  //   }
  // });

  async function getBase64(file) {
    let reader = new FileReader();

    return new Promise((resolve, reject) => {
      if (file.type == "image/webp") {
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
      } else {
        let url = URL.createObjectURL(file);
        const newImg = new Image();
        newImg.src = url;

        newImg.onload = () => {
          const canvas = document.createElement("canvas");
          canvas.width = newImg.naturalWidth;
          canvas.height = newImg.naturalHeight;
          canvas.getContext("2d").drawImage(newImg, 0, 0);
          canvas.toBlob(
            (blob) => {
              // Now we have a `blob` containing webp data

              // Use the file rename trick to turn it back into a file
              const myImage = new File([blob], "img.webp", {
                type: blob.type,
              });

              reader.readAsDataURL(myImage);

              reader.onload = function () {
                let img = reader.result;
                resolve(img);
                console.log(img);
              };
            },
            "image/webp",
            0.7
          );
        };

        reader.onerror = function (error) {
          reject(error);
        };
      }
    });
  }

  async function assignImage(key, file, type) {
    if (file.size > 16 * 1024 * 1024) {
      alert("Max file size is 16mb");
    } else {
      finalImages[key] = await getBase64(file);
    }
  }

  const createNewProduct = (e) => {
    e.preventDefault();
    let { name, brand, price, about, type, material, fit, launchDate } =
      e.target;

    const details = {
      model: name.value,
      type: type.value,
      material: material.value,
      fit: fit.value,
    };
    const productData = {
      name: name.value,
      brand: brand.value,
      price: price.value,
      sizes: sizes,
      colors: colors,
      about: about.value,
      details: details,
      images: finalImages,
      gender: gender,
      launch_date: launchDate,
    };

    apiInstance.post("/products", productData);
  };

  useEffect(() => {
    if (images == null) return;
    let arr = [];
    for (let i = 0; i < images.length; i++) {
      arr.push(URL.createObjectURL(images[i]));
    }

    setImagesUrlArray(arr);
  }, [images]);

  return (
    <AdminLayout>
      <div className="admin">
        <h2>Create New Product</h2>
        <form onSubmit={createNewProduct} className="newProductForm">
          <Input name="name" placeholder="Name" />
          <Input name="brand" placeholder="Brand" />
          <TextField
            name="price"
            placeholder="Price"
            prefix="$"
            variant="standard"
          />
          <FormControl>
            <InputLabel id="sizes-label">Sizes</InputLabel>
            <Select
              labelId="sizes-label"
              label="Sizes"
              name="sizes"
              placeholder="Sizes"
              multiple
              value={sizes}
              onChange={(e) => setSizes(e.target.value)}
            >
              <MenuItem value="xs">XS</MenuItem>
              <MenuItem value="s">S</MenuItem>
              <MenuItem value="m">M</MenuItem>
              <MenuItem value="l">L</MenuItem>
              <MenuItem value="xl">XL</MenuItem>
            </Select>
          </FormControl>

          <Input
            onChange={(e) =>
              setColors(
                e.target.value.split(",").map(function (item) {
                  return item.trim().toLowerCase();
                })
              )
            }
            name="colors"
            placeholder="Colors"
          />

          {/* Assigning images according to colors */}

          {Array.isArray(colors) &&
            colors.map((c, i) => (
              <div key={i}>
                <label>{c}</label>
                {finalImages[c] !== undefined && (
                  <img height={"100px"} src={finalImages[c]} />
                )}
                <input
                  onChange={(e) => assignImage(c, e.target.files[0])}
                  name={c}
                  type="file"
                />
              </div>
            ))}

          {/* <ImageList
            sx={{ height: "auto" }}
            variant="quilted"
            cols={2}
            rowHeight={121}
          >
            {Array.isArray(imagesUrlArray) &&
              imagesUrlArray.map((img, i) => (
                <ImageListItem key={i}>
                  <img src={img} loading="lazy" />
                </ImageListItem>
              ))}
          </ImageList> */}

          <Input name="about" placeholder="About" multiline rows={4} />
          <Input name="type" placeholder="Type" />
          <Input name="material" placeholder="Material" />
          <Input name="fit" placeholder="Fit" />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Launch Date"
              onChange={(newValue) => setLaunchDate(newValue)}
            />
          </LocalizationProvider>

          <FormControl>
            <InputLabel id="gender-label">Gender</InputLabel>
            <Select
              labelId="gender-label"
              label="Gender"
              name="gender"
              placeholder="Gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="female">Female</MenuItem>
              <MenuItem value="unisex">Unisex</MenuItem>
            </Select>
          </FormControl>

          <Button type="submit">Create</Button>
        </form>
      </div>
    </AdminLayout>
  );
};

export default AdminPage;
