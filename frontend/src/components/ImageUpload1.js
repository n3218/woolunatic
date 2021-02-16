import React from "react"
import axios from "axios"
import { Form, Row, Col, Button } from "react-bootstrap"
import Loader from "./Loader"
import Resizer from "react-image-file-resizer"

const ImageUpload = ({ image, setImage, uploading, setUploading }) => {
  const uploadFileHandler = async e => {
    const file = e.target.files
    const formData = new FormData()
    for (let i in file) {
      console.log("---------------file[i]: ", file[i])
      if (typeof file[i] === "object") {
        let width = await checkImageWidth(file[i])
        if (width <= 1440) {
          formData.append(`image`, file[i])
        } else {
          const resizedImage = await resizeImage(file[i])
          console.log("-----resizedImage: ", resizedImage)
          formData.append(`image`, resizedImage)
        }
      }
    }

    setUploading(true)

    try {
      const config = { headers: { "Content-Type": "multipart/form-data" } }
      const { data } = await axios.post("/api/upload", formData, config)
      console.log("data: ", data)
      setImage([...image, ...data.map(img => `/${img.path}`)])
      setUploading(false)
    } catch (error) {
      console.error(error)
      setUploading(false)
    }
  }

  const resizeImage = file => {
    console.log("================file:", file)
    return new Promise(resolve => {
      Resizer.imageFileResizer(
        file,
        1440,
        1440,
        "JPEG",
        90,
        0,
        uri => {
          console.log("URI: ", uri)
          resolve(uri)
        },
        "blob"
      )
    })
  }

  const checkImageWidth = async file => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = event => {
        const image = new Image()
        image.src = event.target.result
        image.onload = () => {
          resolve(image.width)
          return image.width
        }
        reader.onerror = err => reject(err)
      }
    })
  }

  const moveImage = img => {
    console.log("moveImage")
    let copy = image
    let filteredImages = copy.filter(el => el !== img)
    setImage([img, ...filteredImages])
  }

  const deleteImage = img => {
    let copy = image
    let filteredImages = copy.filter(el => el !== img)
    setImage([...filteredImages])
  }

  return (
    <Form.Group controlId="image-file" className="mb-4">
      <Row>
        <Col sm="2">
          <Form.Label>Images</Form.Label>
          <div className="label-comment">Upload, move to first place, delete</div>
        </Col>
        <Col>
          {image &&
            image.map(img => (
              <div key={img} className="color-picture">
                <Form.Label>
                  <img src={img} alt="Color Preview" width="80" />
                </Form.Label>
                <Row>
                  <Col>
                    <Button variant="link text-success" title="Move Image" onClick={() => moveImage(img)}>
                      <i className="fas fa-arrow-left"></i>
                    </Button>
                  </Col>
                  <Col>
                    <Button variant="link text-danger" title="Delete Image" onClick={() => deleteImage(img)}>
                      <i className="fas fa-trash"></i>
                    </Button>
                  </Col>
                </Row>
              </div>
            ))}

          <Form.File id="image-file" label="Choose Images to upload" custom onChange={uploadFileHandler} multiple accept="image/png, image/jpeg, image/jpg"></Form.File>
          {uploading && <Loader />}
        </Col>
      </Row>
    </Form.Group>
  )
}

export default ImageUpload
