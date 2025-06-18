'use client';
import { Button } from 'antd';

const Home = () => (
  <div className="App">
    this is the home page
    <Button type="primary" onClick={()=>{console.log(`testes agora`)}}>Button</Button>
  </div>
);

export default Home;