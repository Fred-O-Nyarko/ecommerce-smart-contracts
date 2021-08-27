import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect, useSelector } from 'react-redux';
import {

  Form,
  Input,
  InputNumber,
  Select,
  Button,
  Alert,
  Upload,
  FormProps,
} from 'antd';
import   Icon from '@ant-design/icons'

import ipfsAPI from 'ipfs-api';
import { IPFS_HOST, IPFS_PORT, IPFS_GATEWAY_PORT } from '../../config';
import './add-product.css';
import { useProducts } from '../../redux/hooks/useProducts';
import { IReduxStore } from '../../redux/types';
import {} from '../../redux/reducers/productsReducer'

const { Item: FormItem } = Form;
const { TextArea } = Input;
const { Option } = Select;
const { Dragger } = Upload;
const ipfs = ipfsAPI(IPFS_HOST, IPFS_PORT);


const AddProduct = () => {

  const [__state, setState] = useState({})
  const state = {
    name: '',
    category: '',
    imageLink: '',
    description: '',
    price: 0,
    unit: 'wei',
  };

  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
  };

  let status = ""

const {resetAddStatus, addProduct} = useProducts()
const product = useSelector( (state: IReduxStore)=> state.product)
const errorMessage = ""


function handleSubmit(event?:any){
    event.preventDefault();
    resetAddStatus();
    addProduct(state);
}

const handleChange = (field: any) => (event: any) => {
  const value = typeof event === 'object' ? event.target.value : event;

  setState({
    [field]: value,
  });
};

const handleImageUpload = ({ file }: any) => {
  const reader = new FileReader();
  reader.onloadend = async () => {
  const [response] = await ipfs.add([Buffer.from(reader.result!)]);
    setState({
      imageLink: `http://${IPFS_HOST}:${IPFS_GATEWAY_PORT}/ipfs/${
        response.hash
      }`,
    });
  };
  reader.readAsArrayBuffer(file);
};


  return(
    // @ts-ignore
    <Form className="addProducts" onSubmit={handleSubmit}>
    <FormItem label="Name" {...formItemLayout}>
      <Input
        placeholder="Product name"
        value={state.name}
        onChange={handleChange('name')}
      />
    </FormItem>
    <FormItem label="Description" {...formItemLayout}>
      <TextArea
        placeholder="Description"
        value={state.description}
        onChange={handleChange('description')}
      />
    </FormItem>
    <FormItem label="Category" {...formItemLayout}>
      <Input
        placeholder="Category"
        value={state.category}
        onChange={handleChange('category')}
      />
    </FormItem>
    <FormItem label="Image Link" {...formItemLayout}>
      <Input placeholder="Image URL" value={state.imageLink} disabled />
    </FormItem>
    <FormItem wrapperCol={{ span: 12, offset: 6 }}>
      <Dragger
        customRequest={handleImageUpload}
        listType="picture"
        showUploadList={false}
      >
        <p className="ant-upload-drag-icon">
          <Icon type="inbox" />
        </p>
        <p className="ant-upload-text">
          Click or drag file to this area to upload
        </p>
        <p className="ant-upload-hint">
          The file will be uploaded to IPFS, a peer-to-peer hypermedia
          protocol to make the web faster, safer, and more open.
        </p>
      </Dragger>
    </FormItem>
    <FormItem label="Price" {...formItemLayout}>
      <InputNumber
        placeholder="Price"
        value={state.price}
        onChange={handleChange('price')}
      />
      <Select
        value={state.unit}
        style={{ width: '105px', marginLeft: '10px' }}
        onChange={handleChange('unit')}
      >
        <Option value="wei">Wei</Option>
        <Option value="shannon">Shannon</Option>
        <Option value="szabo">Szabo</Option>
        <Option value="finney">Finney</Option>
        <Option value="ether">Ether</Option>
      </Select>
    </FormItem>
    <FormItem wrapperCol={{ span: 12, offset: 6 }}>
      <Button
        type="primary"
        htmlType="submit"
        loading={status === 'ADDING'}
      >
        Add
      </Button>
    </FormItem>
    {status === 'SUCCESS' && (
      <FormItem wrapperCol={{ span: 12, offset: 6 }}>
        <Alert
          message="Product added successfully"
          type="success"
          closable
        />
      </FormItem>
    )}
    {status === 'FAIL' && (
      <FormItem wrapperCol={{ span: 12, offset: 6 }}>
        <Alert message={errorMessage} type="error" closable />
      </FormItem>
    )}
  </Form>
  )

}


// const mapStateToProps = state => ({
//   errorMessage: state.products.addErrorMessage,
//   status: state.products.addStatus,
// });

export default AddProduct;
