import { Fragment } from "react";
import fs from "fs/promises";
import path from "path";

function ProductDetailsPage(props) {

const {loadedProducts} = props;

if(!loadedProducts){
    console.log('loading...');
    return <div>loading...</div>
}

  return (
    <Fragment>
      <div>{loadedProducts.id}</div>
      <div>{loadedProducts.title}</div>
    </Fragment>
  );
}


async function fetchProductData(){
    const filePath = path.join(process.cwd(), 'data', 'dummy-data.json');
    const jsonData = await fs.readFile(filePath);
    const data = JSON.parse(jsonData);
    return data;
}

export async function getStaticProps(context) {
    const {params} = context;
    const productId = params.pid;

    const data = await fetchProductData();
    const product = data.products.find(product => product.id === productId);

    if(!product){
        return {
            notFound: true
        }
    }

    return {props:{
        loadedProducts: product
    }}
}

export async function getStaticPaths(){

    const data = await fetchProductData();
    const productParams = data.products.map(product => product.id);
    const paramsObj = productParams.map(id => ({params: {pid:id}}))
    return {
        paths: paramsObj,
        fallback: true
    };
}

export default ProductDetailsPage;
