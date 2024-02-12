//import { Outlet } from "react-router-dom";
import styles from './Layout.module.css';

const Layout: React.FC = () => (
  <>
    <h1 className={styles["title"]}>Odpočítač</h1>
    
    {/* <Outlet /> */}
   
    <footer> 
      <hr />
      <p>created by Ivancorp (c)2024</p>
    </footer>
  </>
);

export default Layout;
