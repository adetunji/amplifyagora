import React from "react";
import {PhotoPicker} from "aws-amplify-react"
import {AmplifyS3ImagePicker} from '@aws-amplify/ui-react'
// prettier-ignore
import { Form, Button, Input, Notification, Radio, Progress } from "element-react";

class NewProduct extends React.Component {
  state = {
    description: "",
    price: "",
    imagePreview: "",
    shipped: false
  };

  handleAddProduct = () => {
    console.log('product added!')
  }

  render() {
    const {shipped, imagePreview} = this.state
    return (
      <div className="flex-center">
        <h2 className="header">
          Add New Product
        </h2>
        <div>
          <Form className="market-header">
            <Form.Item label="Add Product Description">
              <Input type="text" icon="information" placeholder="Description" onChange={description => this.setState({description})}/>
            </Form.Item>
            <Form.Item label="Set Product Price">
              <Input type="number" icon="plus" placeholder="Price ($USD)" onChange={price => this.setState({price})}/>
            </Form.Item>
            <Form.Item label="Is the Product Shipped or Emailed to the Customer?">
              <div className="text-center">
                <Radio
                  value="true"
                  checked={shipped === true}
                  onChange={() => this.setState({shipped: true})}>
                  Shipped
                </Radio>
                <Radio
                 value="false"
                 checked={shipped === false}
                 onChange={() => this.setState({shipped: false})}>
                  Emailed
                </Radio>
              </div>
            </Form.Item>
            {imagePreview && (
              <img
                className="image-preview"
                src="{imagePreview}"
                alt="Product Preview"
              />
            )}
            {/* <PhotoPicker
              title="Product Image"
              preview="hidden"
              onLoad={url => this.setState({ imagePreview: url })} 
              theme={{
                formContainer: {
                  margin: 0,
                  padding: '0.8em'
                },
                formSection: {
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center'
                },
                sectionBody: {
                  margin: 0,
                  width: "250px"
                },
                sectionHeader: {
                  padding: '0.2em',
                  color:"var(--darkAmazonOrange)"
                },
                photoPickerButton: {
                  // display: "none"
                }
              }}
              /> */}
              <AmplifyS3ImagePicker path="pictures/"         theme={{
                formContainer: {
                  margin: 0,
                  padding: '0.8em'
                },
                formSection: {
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center'
                },
                sectionBody: {
                  margin: 0,
                  width: "250px"
                },
                sectionHeader: {
                  padding: '0.2em',
                  color:"var(--light-blue)"
                },
                photoPickerButton: {
                  color: "var(--light-blue)"
                }
              }}/>
            {/* <Form.Item>
              <Button
                type="primary"
                onClick={this.handleAddProduct}>
                  Add Product
              </Button>
            </Form.Item> */}

          </Form>
        </div>
      </div>
    )
  }
}

export default NewProduct;
