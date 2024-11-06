import React from 'react';
import "../directory.css";
import ArrowDown from '../../../../images/icons/arrow-down.svg';
import { Point } from "../../../../types/tree";

type FilterProps = {
    onSort: (key: keyof Point) => void; 
};


export default function Filter({ onSort }: FilterProps) {
    return (
        <div className="filter">
            <span className="filter-text">filter</span>
            <div className="filter-category">   
                <div className="filter-category-field" onClick={() => onSort('tagNum')}> 
                    <span>Tag Number</span>
                    <img src={ArrowDown} alt="Sort"/>
                </div>
                <div className="filter-category-field" onClick={() => onSort('speciesCo')}> 
                    <span>Species Code</span>
                    <img src={ArrowDown} alt="Sort"/>
                </div>
                <div className="filter-category-field" onClick={() => onSort('latinName')}> 
                    <span>Latin Name</span>
                    <img src={ArrowDown} alt="Sort"/>
                </div>
                <div className="filter-category-field" onClick={() => onSort('commonName')}> 
                    <span>Common Name</span>
                    <img src={ArrowDown} alt="Sort"/>
                </div>
                <div className="filter-category-field" onClick={() => onSort('lat')}> 
                    <span>Lat</span>
                    <img src={ArrowDown} alt="Sort"/>
                </div>
                <div className="filter-category-field" onClick={() => onSort('lng')}> 
                    <span>Long</span>
                    <img src={ArrowDown} alt="Sort"/>
                </div>
            </div>
        </div>
    );
};
