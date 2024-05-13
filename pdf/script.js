$(document).ready(function() {
    var pdfDoc = null;
    var pageNum = 1;
    var scale = 1;
    var canvas = document.getElementById('pdf-canvas');
    var ctx = canvas.getContext('2d');
    // /Users/dengbingbing/Desktop/pdf
    // https://github.com/bing-deng/Demo/blob/master/book.pdf?raw=true
    // https://pamphlet-reha.adplat.jp/document/pamphlet/4867000-2-2-0/book.pdf
    // https://pamphlet2reader.adplat.jp/doc/4177600-0-1-3/book.pdf
    pdfjsLib.getDocument('https://github.com/bing-deng/Demo/blob/master/book.pdf?raw=true').promise.then(function(doc) {
        pdfDoc = doc;
        renderPage(pageNum);
    });

    function renderPage(num) {
        console.log("renderPage")
        console.log(num)
        pdfDoc.getPage(num).then(function(page) {
            var viewport = page.getViewport({scale: scale});
            canvas.height = viewport.height;
            canvas.width = viewport.width;

            var renderContext = {
                canvasContext: ctx,
                viewport: viewport
            };
            page.render(renderContext).promise.then(function() {
                console.log('Page rendered');
            });
        });
    }

    $("#search-button").click(function() {
        var query = $("#search-box").val();
        searchInPageText(pageNum, query);
    });
    function searchInPageText(pageNum, query) {
        pdfDoc.getPage(pageNum).then(function(page) {
            page.getTextContent().then(function(textContent) {
                var textItems = textContent.items;
                var searchText = textItems.map(item => item.str).join(' ');
    
                if(searchText.indexOf(query) !== -1) {
                    textItems.forEach(function(item) {
                        if (item.str.indexOf(query) !== -1) {
                            console.log("Text found at position:", item.transform[4], item.transform[5]);
                        }
                    });
                } else {
                    alert("Text not found");
                }
            });
        });
    }
    
});
