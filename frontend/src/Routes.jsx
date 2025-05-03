import { Routes, Route } from "react-router-dom";
import './index.css';
import Home from "./pages/Home";
import Subnet from "./pages/subnetVisualisation";
import Vlsm from './pages/vslmvisualizerPage';
import SubnetWork from './pages/subnetWorking'
import VlsmWork from './pages/vlsmWorking';

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/subnet-visualization" element={<Subnet />} />
            <Route path="//vlsm-visualizer" element={<Vlsm />} />
            <Route path="/subnet-working" element={<SubnetWork />} />
            <Route path="/vlsm-working" element={<VlsmWork />} />
        </Routes>
    )
}

export default AppRoutes; 
