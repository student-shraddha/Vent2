import AddListing02Css from "../src/styles/dashboard/AddListing02.module.css";
import Image from "next/image";
import { Col, Container, Row } from "react-bootstrap";
import { Button, Input, Form, Upload, Modal } from "antd";
import cloud from "../public/images/vector/cloud.svg";
import mount from "../public/images/vector/mount.svg";
import React, { useState } from "react";
import { UploadOutlined, PlusOutlined } from '@ant-design/icons';
// import { PlusOutlined } from '@ant-design/icons';

const Addlisting02 = ({ onContinue, onBack, initialValues, setInitialValues }) => {
  const [form] = Form.useForm();

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload Or Drag & Drop
      </div>
    </div>
  );

  console.log("initialValues: ", initialValues)
  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });


  const [fileList, setFileList] = useState(initialValues.images);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');

  const handleCancel = () => setPreviewOpen(false);
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
  };
  const handleChange = (file) => {
    console.log("file: ", file)
    const { fileList: newFileList } = file
    setFileList(newFileList)
  };


  const [fileListVideo, setFileListVideo] = useState(initialValues.videos);
  const [previewOpenVideo, setPreviewOpenVideo] = useState(false);
  const [previewImageVideo, setPreviewImageVideo] = useState('');
  const [previewTitleVideo, setPreviewTitleVideo] = useState('');

  const handleCancelVideo = () => setPreviewOpenVideo(false);
  const handlePreviewVideo = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setPreviewImageVideo(file.url || file.preview);
    setPreviewOpenVideo(true);
    setPreviewTitleVideo(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
  };
  const handleChangeVideo = ({ fileList: newFileList }) => setFileListVideo(newFileList);


  return (
    <>
      {/*     -------------------------     TEXT AREA      ----------------------------    */}
      <Container>

        <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
          <img
            alt="example"
            style={{
              width: '100%',
            }}
            src={previewImage}
          />
        </Modal>

        <Modal open={previewOpenVideo} title={previewTitleVideo} footer={null} onCancel={handleCancelVideo}>
          <img
            alt="example"
            style={{
              width: '100%',
            }}
            src={previewImageVideo}
          />
        </Modal>
        <Form
          form={form}
          onFinish={() => {
            onContinue({ images: fileList, videos: fileListVideo })
          }}
        >
          <Col md={10}>
            <h3 className={AddListing02Css.addListing}>Add Listing</h3>



            <Row className={AddListing02Css.imgParent}>
              <h4>Images</h4>
              <Upload
                // action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                listType="picture-card"
                fileList={fileList}
                onPreview={handlePreview}
                onChange={handleChange}
              >
                {fileList.length >= 15 ? null : uploadButton}
              </Upload>
            </Row>

            <Row className={AddListing02Css.imgParent}>
              <h4>Video</h4>
              <Upload
                // action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                listType="picture-card"
                fileList={fileListVideo}
                // onPreview={handlePreviewVideo}
                onChange={handleChangeVideo}
              >
                {fileListVideo.length >= 1 ? null : uploadButton}
              </Upload>
            </Row>

            <Row>
              {/* <h4 className={AddListing02Css.info}>Video URL</h4> */}

              <Row>
                {/* <Form.Item
                  // className={RegisterToHost.form_items}
                  name="videos"
                  tooltip="Videos"
                >
                  <Input
                    type="text"
                    placeholder="Select the video link or URL Supported formats: youtube, vimeo, SWF, and MOV"
                    className={AddListing02Css.listing}
                  />
                </Form.Item> */}

                {/* <div className={AddListing02Css.twobtn}>
                <Button className={AddListing02Css.savebtn}>Back</Button>
                <Button className={AddListing02Css.savebtn}>
                  Save as Draft
                </Button>
              </div> */}

                <div className={AddListing02Css.twobtn}>
                  <Button className={AddListing02Css.savebtn} onClick={onBack}>Back</Button>
                  <Button className={AddListing02Css.addbtn} htmlType="submit_signup"> Continue</Button>
                </div>
              </Row>
            </Row>
          </Col>
        </Form>
      </Container>
    </>
  );
};

export default Addlisting02;