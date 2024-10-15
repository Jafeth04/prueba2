document.getElementById('attendance-form').addEventListener('submit', function (e) {
    e.preventDefault();

    // Obtener los valores de los inputs
    const studentName = document.getElementById('studentName').value;
    const studentID = document.getElementById('studentID').value;
    const group = document.getElementById('group').value;
    const career = document.getElementById('career').value;

    // Obtener la fecha y hora actual
    const now = new Date();
    const date = now.toLocaleDateString();
    const time = now.toLocaleTimeString();

    // Crear una nueva fila en la tabla
    const table = document.getElementById('attendance-table').getElementsByTagName('tbody')[0];
    const newRow = table.insertRow();

    // Insertar las celdas en la fila
    const nameCell = newRow.insertCell(0);
    const idCell = newRow.insertCell(1);
    const groupCell = newRow.insertCell(2);
    const careerCell = newRow.insertCell(3);
    const dateCell = newRow.insertCell(4);
    const timeCell = newRow.insertCell(5);

    // Asignar los valores a las celdas
    nameCell.textContent = studentName;
    idCell.textContent = studentID;
    groupCell.textContent = group;
    careerCell.textContent = career;
    dateCell.textContent = date;
    timeCell.textContent = time;

    // Limpiar los campos del formulario
    document.getElementById('studentName').value = '';
    document.getElementById('studentID').value = '';
    document.getElementById('group').value = '';
    document.getElementById('career').value = '';
});

// Funcionalidad para generar el PDF
document.getElementById('download-pdf').addEventListener('click', function () {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    doc.text("Lista de Asistencia", 14, 16);
    
    const table = document.getElementById('attendance-table');
    let rows = [];

    // Extraer las filas de la tabla para el PDF
    for (let i = 1; i < table.rows.length; i++) {
        let row = [];
        for (let j = 0; j < table.rows[i].cells.length; j++) {
            row.push(table.rows[i].cells[j].innerText);
        }
        rows.push(row);
    }

    // Añadir la tabla al PDF
    doc.autoTable({
        head: [['Nombre', 'ID', 'Grupo', 'Carrera', 'Fecha', 'Hora']],
        body: rows,
    });

    // Descargar el PDF
    doc.save('lista_asistencia.pdf');
});
