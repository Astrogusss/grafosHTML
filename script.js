document.addEventListener('DOMContentLoaded', function() {
    const uploadForm = document.getElementById('uploadForm');
    const checkboxes = document.querySelectorAll('input[name="area"]');
    const resultDiv = document.getElementById('result');
    const pdfUploadInput = document.getElementById('pdfUpload');

    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            checkboxes.forEach(otherCheckbox => {
                if (otherCheckbox !== this) {
                    otherCheckbox.checked = false;
                }
            });
        });
    });

    uploadForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Impede o envio padrão do formulário

        const selectedPdf = pdfUploadInput.files[0];
        const selectedAreas = Array.from(checkboxes)
                                   .filter(checkbox => checkbox.checked)
                                   .map(checkbox => checkbox.value);

        if (!selectedPdf) {
            resultDiv.textContent = 'Por favor, selecione um arquivo PDF.';
            resultDiv.style.color = 'red';
            return;
        }

        if (selectedAreas.length === 0) {
            resultDiv.textContent = 'Por favor, selecione uma área de interesse.';
            resultDiv.style.color = 'red';
            return;
        }

        // Exibindo as informações selecionadas (normalmente você enviaria isso para um servidor)
        const pdfName = selectedPdf.name;
        const areaName = selectedAreas[0]; // Já que apenas uma pode ser selecionada

        resultDiv.textContent = `PDF "${pdfName}" enviado com a área selecionada: "${areaName}".`;
        resultDiv.style.color = 'green';

        // Aqui você adicionaria o código para realmente fazer o upload do PDF e enviar a área selecionada
        // Exemplo: Usando FormData e a API fetch
        /*
        const formData = new FormData();
        formData.append('pdf', selectedPdf);
        formData.append('area', areaName);

        fetch('/upload-endpoint', { // Substitua pelo seu endpoint de upload real
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            console.log('Upload bem-sucedido:', data);
            resultDiv.textContent = 'Upload realizado com sucesso!';
            resultDiv.style.color = 'green';
        })
        .catch(error => {
            console.error('Erro no upload:', error);
            resultDiv.textContent = 'Erro ao fazer upload. Tente novamente.';
            resultDiv.style.color = 'red';
        });
        */
    });
});