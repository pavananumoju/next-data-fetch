import fs from "fs/promises";
import path from "path";
import { Inter } from "next/font/google";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function Home(props) {
  const {products} = props;
  return (
    <div>
      <ul> {products.map(product => <li key={product.id}><Link href={`/${product.id}`}>{product.title}</Link></li>)}
      </ul>
    </div>
  );
}

export async function getStaticProps() {
    console.log('(Re)Generating...');
    const filePath = path.join(process.cwd(), 'data', 'dummy-data.json');
    const jsonData = await fs.readFile(filePath);
    const data = JSON.parse(jsonData);

  return {
    props: {
      products: data.products,
    },
    revalidate: 10
  };
}
