import React, { useState, createContext, useEffect } from 'react';
import { getPDF } from '../../client/actions/api';
import PropTypes from 'prop-types';

export const PdfContext = createContext();

export const PdfContextProvider = ({ children }) => {
    const [pdfs, setPdfs] = useState(null);
    const [categories, setCategories] = useState(null);
    const [sortedPdfs, setSortedPdfs] = useState(null);
    const [loading, setLoading] = useState(true);

    const getPdfs = async () => {
        setLoading(true);
        const pdfs = await getPDF();

        setPdfs(pdfs.pdfMap);
        setCategories(Object.keys(pdfs.pdfMap).sort());
        setSortedPdfs(pdfs.sortedPdfs);
        setLoading(false);
    };

    useEffect(()=> {
        getPdfs();
    }, []);

    return (
      <PdfContext.Provider value={[loading, pdfs, categories, sortedPdfs]}>
        {children}
      </PdfContext.Provider>
    );
};

PdfContextProvider.propTypes = {
    children: PropTypes.objectOf(Object)
};

PdfContextProvider.defaultProps = {
    children: null
};