import $ from "jquery"

$.fn.cityButtons = function () {
    const button = 600

    function filterByCity(city) {
        $("[wm-city]").each(function (i, e) {
            const isTarget = $(this).attr("wm-city") === city || city === null
            if (isTarget) {
                $(this).fadeIn(button)
            }
            else {
                $(this).fadeOut(button)
            }
        })
    }

    const cityButtons = $("[wm-city-buttons]")
    const cities = new Set

    $("[wm-city]").each(function (i, e) {
        cities.add($(e).attr("[wm-city]"))
    })

    const btns = Array.from(cities).map(city => {
        const btn = $("<button>").addClass("btn", "btn-primary").html(city)
        btn.trigger("click", e => filterByCity(city))
        return btn
    })

    const btnAll = $("<button>").addClass("btn", "btn-primary").html("Todas")

    btnAll.trigger("click", e => filterByCity(null))
    btns.push(btnAll)

    const btngroup = $("<div>").addClass(["btn-group"])

    btngroup.append(btns)
    $(this).html(btngroup)

    return this
}

$("[wm-city-buttons").cityButtons()