import React from 'react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

const PDFExport = ({ cvData, template }) => {
  const exportPDF = async () => {
    // Get the CV preview element
    const input = document.getElementById('cv-preview');
    if (!input) return;
    
    try {
      // Show loading indicator
      document.body.style.cursor = 'wait';
      
      // Create a hidden container for PDF rendering
      const container = document.createElement('div');
      container.style.position = 'absolute';
      container.style.left = '-9999px';
      container.style.top = '-9999px';
      container.style.width = '210mm'; // A4 width
      document.body.appendChild(container);
      
      // Clone the preview
      const clone = input.cloneNode(true);
      clone.style.width = '100%';
      clone.style.height = 'auto';
      clone.style.position = 'static';
      clone.style.boxShadow = 'none';
      clone.style.borderRadius = '0';
      clone.style.overflow = 'visible';
      clone.style.transform = 'none';
      clone.style.maxHeight = 'none';
      
      // Remove any hover effects
      const hoverElements = clone.querySelectorAll('.cv-item, .cv-skill');
      hoverElements.forEach(el => {
        el.classList.remove('hover');
        el.style.transform = 'none';
        el.style.boxShadow = 'none';
        el.style.transition = 'none';
      });
      
      // Fix for watermark
      const watermark = clone.querySelector('.cv-watermark');
      if (watermark) watermark.style.opacity = '0.2';
      
      // Add special class for PDF styling
      clone.classList.add('for-pdf-export');
      
      // Append to container
      container.appendChild(clone);
      
      // Wait for rendering
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Use html2canvas with better settings
      const canvas = await html2canvas(clone, {
        scale: 2, // Higher resolution
        useCORS: true,
        allowTaint: true,
        backgroundColor: isDarkTemplate(template) ? '#0f172a' : '#ffffff',
        logging: false,
        removeContainer: false, // We'll handle cleanup manually
        onclone: (clonedDoc) => {
          // Additional adjustments can be made here if needed
          const clonedElement = clonedDoc.querySelector('.for-pdf-export');
          if (clonedElement) {
            // Make sure dark text on light backgrounds and light text on dark backgrounds are preserved
            if (isDarkTemplate(template)) {
              ensureTextContrast(clonedElement, true);
            } else {
              ensureTextContrast(clonedElement, false);
            }
          }
        }
      });
      
      // Clean up the DOM
      document.body.removeChild(container);
      
      // Create PDF with better quality
      const imgData = canvas.toDataURL('image/png', 1.0);
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
        compress: true
      });
      
      // Get PDF dimensions
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      
      // Calculate ratio to fit on page
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      
      // Center the image on the page
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 10; // Top margin
      
      // Add the image to the PDF
      pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
      
      // Create filename based on user's name
      const fullName = `${cvData.personalInfo.firstName || ''} ${cvData.personalInfo.lastName || ''}`.trim();
      const filename = fullName ? `${fullName.replace(/\s+/g, '_')}_CV.pdf` : 'CV_Document.pdf';
      
      // Save the PDF
      pdf.save(filename);
      
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error generating PDF. Please try again or check console for details.');
    } finally {
      // Reset cursor
      document.body.style.cursor = 'default';
    }
  };
  
  // Helper function to determine if a template is dark
  const isDarkTemplate = (template) => {
    return ['tech', 'bold'].includes(template);
  };
  
  // Helper function to ensure text has proper contrast
  const ensureTextContrast = (element, isDark) => {
    if (isDark) {
      // For dark templates, make sure text is light colored
      const textElements = element.querySelectorAll('div, span, p, h1, h2, h3, h4, h5, h6');
      textElements.forEach(el => {
        const style = window.getComputedStyle(el);
        // Check if text color is dark
        if (isColorDark(style.color)) {
          // If it's dark text on dark background, make it light
          el.style.color = '#ffffff';
        }
      });
    } else {
      // For light templates, make sure text is dark colored
      const textElements = element.querySelectorAll('div, span, p, h1, h2, h3, h4, h5, h6');
      textElements.forEach(el => {
        const style = window.getComputedStyle(el);
        // Check if text color is too light
        if (!isColorDark(style.color) && style.color !== 'rgb(255, 255, 255)') {
          // If it's light text on light background, make it dark
          el.style.color = '#333333';
        }
      });
    }
  };
  
  // Helper to check if a color is dark
  const isColorDark = (color) => {
    // Parse RGB values
    const rgb = color.match(/\d+/g);
    if (!rgb || rgb.length < 3) return false;
    
    // Calculate brightness (simple formula)
    const brightness = (parseInt(rgb[0]) * 299 + parseInt(rgb[1]) * 587 + parseInt(rgb[2]) * 114) / 1000;
    
    // Return true if color is dark (brightness < 128)
    return brightness < 128;
  };

  return (
    <button onClick={exportPDF} className="btn btn-primary">
      Export as PDF
    </button>
  );
};

export default PDFExport;