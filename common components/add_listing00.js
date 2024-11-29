import React from 'react'
import { Col, Container, Row } from "react-bootstrap";
import { Input, Form, Button, Select } from "antd";
import AddListingCss from "../src/styles/dashboard/AddListing.module.css";
const { TextArea } = Input;

const Addlisting00 = ({ onContinue, initialValues }) => {

    const [form] = Form.useForm();


    form.setFieldsValue({
        name: initialValues.name,
        description: initialValues.description,
        type: initialValues.type,
        area: initialValues.area,
        beds: initialValues.beds,
        bathrooms: initialValues.bathrooms,
        capacity: initialValues.capacity,
    });
    return (
        <Container>
            <Form
                form={form}
                onFinish={onContinue}
            >
                <Col md={9}>
                    <h3 className={AddListingCss.addListing}>Add Listing</h3>

                    <h4 className={AddListingCss.info}>Information</h4>

                    <hr />
                    {/* 
                <Row className={AddListingCss.parentCheckbox}>
                    <Col md={3}>
                        <Checkbox>Golf Course Front</Checkbox>
                    </Col>

                    <Col md={3}>
                        {" "}
                        <Checkbox>Golf Course Community</Checkbox>
                    </Col>

                    <Col md={3}>
                        <Checkbox>Golf Course Vicinity</Checkbox>
                    </Col>

                    <Col md={3}>
                        {" "}
                        <p>Please check all that applies</p>
                    </Col>
                </Row> */}

                    <Row>
                        <Col md={12}>
                            <h4 className={AddListingCss.title}>Title*</h4>

                            <Form.Item
                                // className={RegisterToHost.form_items}
                                name="name"
                                tooltip="Property name"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please enter property name!",
                                        whitespace: true,
                                    },
                                ]}
                            >
                                <Input
                                    type="text"
                                    placeholder="Enter the property name"
                                    className={AddListingCss.listing}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12}>
                            <h4 className={AddListingCss.title}>Description*</h4>

                            <Form.Item
                                // className={RegisterToHost.form_items}
                                name="description"
                                tooltip="Description"
                            >
                                <TextArea
                                    type="text"
                                    placeholder="Description"
                                    className={AddListingCss.listing}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <h4 className={AddListingCss.type}>
                                Property Type *
                            </h4>
                            <Form.Item
                                // className={RegisterToHost.form_items}
                                name="type"
                                tooltip="Select a property type"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please select a property type!",
                                        whitespace: true,

                                    },
                                ]}
                            >
                                <Select
                                    placeholder="Select a property type"
                                    options={[
                                        {
                                            value: "Villa",
                                            label: "Villa",
                                        },
                                        {
                                            value: "Bunglow",
                                            label: "Bunglow",
                                        },
                                        {
                                            value: "Duplex",
                                            label: "Duplex",
                                        },
                                    ]}
                                    trigger={["click"]}
                                    size="large"
                                >
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col md={6}>
                            <h4 className={AddListingCss.type}>
                                Area *
                            </h4>
                            <Form.Item
                                // className={RegisterToHost.form_items}
                                name="area"
                                tooltip="Property area"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please enter property area!",
                                        whitespace: true,
                                    },
                                ]}
                            >
                                <Input
                                    type="text"
                                    placeholder="Enter the property area"
                                    className={AddListingCss.listing}
                                />
                            </Form.Item>
                        </Col>
                    </Row>

                    {/* <p className={AddListingCss.para}>
                    Vicinity Golf Course(s) - Please highlight all courses within 1
                    mile of the listing* (Hold command button down if selecting
                    multiple courses)
                </p> */}

                    {/* <Row>
                    <Col md={3}>
                        <Select
                            defaultValue="Location"
                            options={[
                                {
                                    value: "Florida",
                                    label: "Florida",
                                },
                                {
                                    value: "Arizona",
                                    label: "Arizona",
                                },
                                {
                                    value: "Sanfrancisco",
                                    label: "Sanfrancisco",
                                },
                            ]}
                            trigger={["click"]}
                            size="large"
                        >
                            <Select.Option onClick={(e) => e.preventDefault()}>
                                <Typography.Link
                                    href="https://www.google.com/"
                                    onClick={(e) => e.preventDefault()}
                                >
                                    <Space
                                        className={
                                            AddListingCss.search_by_golf_input_search_by_tourni
                                        }
                                    >
                                        Reservation Fee
                                        <CaretDownOutlined />
                                    </Space>
                                </Typography.Link>
                            </Select.Option>
                        </Select>
                    </Col>

                    <Col md={5}></Col>
                </Row> */}

                    {/* <Row className={AddListingCss.listingbed}>
                    <Col md={6} className={AddListingCss.inputBox}>
                        <h4 className={AddListingCss.subheading}>Type of listing*</h4>
                        <Select
                            defaultValue="Location"
                            options={[
                                {
                                    value: "Florida",
                                    label: "Florida",
                                },
                                {
                                    value: "Arizona",
                                    label: "Arizona",
                                },
                                {
                                    value: "Sanfrancisco",
                                    label: "Sanfrancisco",
                                },
                            ]}
                            trigger={["click"]}
                            size="large"
                        >
                            <Select.Option onClick={(e) => e.preventDefault()}>
                                <Typography.Link
                                    href="https://www.google.com/"
                                    onClick={(e) => e.preventDefault()}
                                >
                                    <Space
                                        className={
                                            AddListingCss.search_by_golf_input_search_by_tourni
                                        }
                                    >
                                        {" "}
                                        Select listing Type
                                        <CaretDownOutlined />
                                    </Space>
                                </Typography.Link>
                            </Select.Option>
                        </Select>
                    </Col>

                    <Col md={6} className={AddListingCss.inputBox}>
                        <h4 className={AddListingCss.subheading}>
                            Number of bedrooms*
                        </h4>
                        <div>
                            <Input
                                type="number"
                                placeholder="Enter number of bedrooms"
                                className={AddListingCss.colA}
                            />
                        </div>
                    </Col>
                </Row> */}

                    <Row className={AddListingCss.listingbed}>
                        <Col md={6} className={AddListingCss.inputBox}>
                            <h4 className={AddListingCss.subheading}>
                                Number of bedrooms*
                            </h4>

                            <Form.Item
                                // className={RegisterToHost.form_items}
                                name="beds"
                                tooltip="Number of bedrooms"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please number of bedrooms!",
                                        whitespace: true,

                                    },
                                ]}
                            >
                                <Input
                                    type="number"
                                    placeholder=" Enter number of bedrooms"
                                    className={AddListingCss.colA}
                                />
                            </Form.Item>
                        </Col>

                        <Col md={6} className={AddListingCss.inputBox}>
                            <h4 className={AddListingCss.subheading}>Number of bathrooms*</h4>
                            <Form.Item
                                // className={RegisterToHost.form_items}
                                name="bathrooms"
                                tooltip="Number of bathrooms"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please number of bedrooms!",
                                        whitespace: true,

                                    },
                                ]}
                            >
                                <Input
                                    type="number"
                                    placeholder="Enter number of bathrooms"
                                    className={AddListingCss.colA}
                                />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row>
                        <Col md={12}>
                            <h4 className={AddListingCss.subheading}>
                                Max number or overnight guests*
                            </h4>
                            <Form.Item
                                // className={RegisterToHost.form_items}
                                name="capacity"
                                tooltip="Numbers of guests"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please enter max numbers of guests allowed!",
                                        whitespace: true,

                                    },
                                ]}
                            >
                                <Input

                                    type="text"
                                    placeholder="Numbers of guests"
                                    className={AddListingCss.listingA}
                                />
                            </Form.Item>
                        </Col>
                    </Row>



                    <div className={AddListingCss.twobtn}>
                        <Button
                            // htmlType="submit_signup"
                            htmlType="submit"
                            className={AddListingCss.addbtn}
                        >Continue</Button>
                    </div>
                </Col>

                <Col md={3}></Col>
            </Form>
        </Container>
    )
}

export default Addlisting00;