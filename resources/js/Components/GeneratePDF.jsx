import { jsPDF } from "jspdf";
import "jspdf-autotable";

export default function GeneratePDF({ saleItems }) {
    const generatePDF = () => {
        const doc = new jsPDF();

        // Get the page width
        const pageWidth = doc.internal.pageSize.getWidth();

        // Center-aligned "Sale Record" title
        doc.setFontSize(18);
        doc.text("Sale Record", pageWidth / 2, 20, { align: "center" });

        // Add some header information (Date, Salesperson, etc.)
        const today = new Date();
        doc.setFontSize(12);
        doc.text(`Date: ${today.toLocaleDateString()}`, pageWidth / 2, 30, {
            align: "center",
        });
        doc.text(`Salesperson: John Doe`, pageWidth / 2, 40, {
            align: "center",
        }); // Example static name

        // Prepare the data for the table (Sale Items)
        const tableData = saleItems.map((item, index) => [
            index + 1,
            item.name,
            item.quantity,
            item.total_price.toFixed(2),
        ]);

        // Add table headers and data
        doc.autoTable({
            head: [["Id", "Medicine", "Quantity", "Total Price"]],
            body: tableData,
            startY: 50,
            theme: "grid",
            headStyles: {
                fillColor: [55, 65, 81],
                textColor: [0, 0, 0],
                lineWidth: 0.5,
                lineColor: [0, 0, 0],
            },
            bodyStyles: {
                lineWidth: 0.5,
                lineColor: [0, 0, 0],
            },
            didParseCell: function (data) {
                if (data.section === "head") {
                    data.cell.styles.fillColor = [0, 0, 0];
                    data.cell.styles.textColor = [255, 255, 255];
                    data.cell.styles.alignment = "center";
                    data.cell.styles.fontSize = 10;
                } else if (data.section === "body") {
                    data.cell.styles.fillColor = [255, 255, 255];
                    data.cell.styles.textColor = [0, 0, 0];
                    data.cell.styles.alignment = "center";
                    data.cell.styles.fontSize = 10;
                }
            },
            didDrawCell: function (data) {
                if (data.section === "body") {
                    data.cell.styles.fillColor = [255, 255, 255];
                    data.cell.styles.textColor = [0, 0, 0];
                    data.cell.styles.alignment = "center";
                    data.cell.styles.fontSize = 10;
                }
            },
        });

        // Add total at the end
        const total = saleItems.reduce(
            (total, item) => total + item.total_price,
            0
        );
        doc.text(
            `Total: $${total.toFixed(2)}`,
            15,
            doc.previousAutoTable.finalY + 20
        );

        // Save the generated PDF
        doc.save("sale_record.pdf");
    };
    return (
        <>
            <button
                type="button"
                className="ml-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={generatePDF}
            >
                Download PDF
            </button>
        </>
    );
}
