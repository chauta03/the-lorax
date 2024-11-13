import React from 'react';
import {useEffect, useState} from 'react';
import "./action_page.css";
import { Point } from "../../../types/tree";
import fetchTreeInfo from '../../../data/trees';
import HeaderMobile from '../../components/headerMobile'; 
import DirectoryButton from './action_buttons/directoryButton';
import AboutButton from './action_buttons/aboutButton';
import TreeButton from './action_buttons/treeButton';
import SearchBar from './action_buttons/searchBar';
import AdminButton from './action_buttons/adminButton';
import MapButton from './action_buttons/mapButton';
import SupportButton from './action_buttons/supportButton';
import AdminButtonMobile from './mobile_action_buttons/adminButtonMobile';
import TreeButtonMobile from './mobile_action_buttons/treeButtonMobile';
import AboutButtonMobile from './mobile_action_buttons/aboutButtonMobile';
import DirectoryButtonMobile from './mobile_action_buttons/directoryButtonMobile';
import MapButtonMobile from './mobile_action_buttons/mapButtonMobile';
import SupportButtonMobile from './mobile_action_buttons/mapButtonMobile copy';

const ActionButton: React.FC = () => {
    const [isMobile, setIsMobile] = useState(false);
    const [searchResults, setSearchResults] = useState<Point[]>([]);

    const Directory_Click = () => {
        alert("Directory");
    };

    const About_Click = () => {
        alert("About");
    };

    const Tree_Click = () => {
        alert("Tree!!!!");
    };

    const AdminButton_Click = () => {
        alert("Admin!!");
    };

    const handleSearch = async (query: string) => {
        try {
            const allTrees = await fetchTreeInfo();
            const terms = query.toLowerCase().split(/\s+/); // Split query by whitespace into terms
    
            const results = allTrees.filter(tree =>
                terms.every(term => 
                    tree.latinName?.toLowerCase().includes(term) ||
                    tree.commonName?.toLowerCase().includes(term) ||
                    tree.tagNum?.toString().includes(term) ||
                    tree.speciesCo?.toLowerCase().includes(term) ||
                    tree.sun?.toLowerCase().includes(term) ||
                    tree.lat?.toString().includes(term) ||
                    tree.lng?.toString().includes(term)
                )
            );
    
            setSearchResults(results);
            console.log('Search results:', results); // Log the results
        } catch (error) {
            console.error("Error during search:", error);
        }
    };
    

    const MapButton_Click = () => {
        alert("Google Maps!!");
    };

    const SupportButton_Click = () => {
        alert("I will always help you!!");
    };
    

    

    // Detect screen width on mount and resize
    useEffect(() => {
      const handleResize = () => {
        setIsMobile(window.innerWidth <= 768);
      };
  
      // Set initial value
      handleResize();
  
      // Attach resize event listener
      window.addEventListener('resize', handleResize);
  
      // Cleanup event listener on unmount
      return () => window.removeEventListener('resize', handleResize);
    }, []);


    return (
        <div>
            {isMobile ? (
                <div className='action-page-phone'>
                    <HeaderMobile />
                    <span className='header-text'>Campus Tree Project</span>
                    <div className='action-page-background-phone'>
                        <div className='action-page-left-buttons'>
                            <AdminButtonMobile onClick={AdminButton_Click} />
                            <TreeButtonMobile onClick={Tree_Click} />
                            <AboutButtonMobile onClick={About_Click} />
                            <DirectoryButtonMobile onClick={Directory_Click} />
                        </div>
                        <div className='action-page-right-buttons'>
                            <SupportButtonMobile onClick={SupportButton_Click} />
                            <MapButtonMobile onClick={MapButton_Click} />
                        </div>
                    </div>
                </div>
            ) : (
                <div className="action-page-background">
                    <div className="action-page-upper-buttons">
                        <DirectoryButton onClick={Directory_Click} />
                        <AboutButton onClick={About_Click} />
                        <TreeButton onClick={Tree_Click} />
                        <AdminButton onClick={AdminButton_Click} />
                    </div>
                    <SearchBar onSearch={handleSearch} />
                    <div className="action-page-lower-buttons">
                        <MapButton onClick={MapButton_Click} />
                        <SupportButton onClick={SupportButton_Click} />
                    </div>
                </div>
            )}
        </div>

    );
};

export default ActionButton;