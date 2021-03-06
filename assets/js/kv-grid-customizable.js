function setColumnsState()
{
    var storage = JSON.parse(localStorage.getItem('grid-config'));
    $.each(storage, function(gridId,cols){
        var tableObj = $('#'+gridId+' table');
        $.each(cols, function(colIndex, state){
            colIndex = colIndex.replace('col-', '');
            if(state){
                $('.customize-cols-list li a[data-index="'+colIndex+'"] i').removeClass('fa-square-o').addClass('fa-check-square-o');
                $('tr>th:nth-child('+colIndex+'), tr>td:nth-child('+colIndex+')', tableObj).removeClass('kv-grid-hide');
            } else {
                $('.customize-cols-list li a[data-index="'+colIndex+'"] i').removeClass('fa-check-square-o').addClass('fa-square-o');
                $('tr>th:nth-child('+colIndex+'), tr>td:nth-child('+colIndex+')', tableObj).addClass('kv-grid-hide');
            }
        });
        $("#"+gridId+"-container").resizableColumns('destroy').resizableColumns({"resizeFromBody":false});
    });
}
$(function(){
    $(window).load(function(){
        $('.kv-grid-loading').removeClass('kv-grid-loading');
    });

    setColumnsState();

    $(document).on('pjax:end', function(data, status, xhr, options) {
        setColumnsState();
        $('.kv-grid-loading').removeClass('kv-grid-loading');
    });

    $(document).on('click', '.customize-cols-list li a', function(){
        var gridId = $(this).data('grid-id');
        var storage = JSON.parse(localStorage.getItem('grid-config'));
        if(!storage) storage = {};
        var grid_storage = storage[gridId]?storage[gridId]:{};
        var colIndex = $(this).data('index');

        var tableObj = $('#'+gridId+' table');

        if($('i', this).hasClass('fa-square-o')){
            $('i', this).removeClass('fa-square-o').addClass('fa-check-square-o');
            $('tr>th:nth-child('+colIndex+'), tr>td:nth-child('+colIndex+')', tableObj).removeClass('kv-grid-hide');
            grid_storage['col-'+colIndex] = 1;
        } else {
            $('i', this).removeClass('fa-check-square-o').addClass('fa-square-o');
            $('tr>th:nth-child('+colIndex+'), tr>td:nth-child('+colIndex+')', tableObj).addClass('kv-grid-hide');
            grid_storage['col-'+colIndex] = 0;
        }
        $("#"+gridId+"-container").resizableColumns('destroy').resizableColumns({"resizeFromBody":false});
        storage[gridId] = grid_storage;
        localStorage.setItem('grid-config', JSON.stringify(storage));

        return false;
    });

    $(document).on('click','.cc-dropdown>button', function (event) {
        $(this).parent().toggleClass('open');
    });

    $('body').on('click', function (e) {
        if (!$('.cc-dropdown>button').is(e.target)
            && $('.cc-dropdown>button').has(e.target).length === 0
            && $('.open').has(e.target).length === 0
        ) {
            $('.cc-dropdown').removeClass('open');
        }
    });
});