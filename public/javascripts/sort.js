$(document).ready(function () {
    $('.table').DataTable({
        "language": {
            "lengthMenu": "Wyświetl _MENU_ pozycji na stronie",
            "zeroRecords": "Nie znaleziono",
            "info": "Strona _PAGE_ z _PAGES_",
            "infoEmpty": "Brak danych",
            "infoFiltered": "(filtered from _MAX_ total records)",
            "paginate": {
                "first": "Pierwsza",
                "last": "Ostatnia",
                "next": "Nastęna",
                "previous": "Poprzednia"
            },
            "search": "Wyszukaj:",
        },
        "bLengthChange": false
    });
    $('.dataTables_length').addClass('bs-select');
}); 