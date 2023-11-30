import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useParams, NavLink } from "react-router-dom";
import {getDistByDistId, getDistributor} from '../redux/reducer/distributorSlice';


const DistNavbar = ()=>{
    const params = useParams();
    const DistributorLink =  Number(params.distributorId);
    const location = useLocation();
    const { pathname } = location;
    const [showInstruction, setShowInstruction] = useState(false);
    const dispatch = useDispatch();
    const splitLocation = pathname.split("/");
    const { distributor } = useSelector((state) => state.distributors);
    let image = process.env.REACT_APP_BASE_URL_IMAGE;
    const distributorProfile = distributor.find(
      (prof_member) => prof_member.distributor_id === DistributorLink
    );
  
    useEffect(() => {
        dispatch(getDistributor(DistributorLink));
    }, [dispatch,DistributorLink]);

    return(
        <div className="grid grid-cols-3">
            <div className="col-span-1">
              <span className="flex space-x-2">
                <label>Dist. Id:</label>
                <label></label>
              </span>
            </div>
            <div className="col-span-1"></div>
            <div className="col-span-1"></div>
        </div>
    )
}
export default DistNavbar;