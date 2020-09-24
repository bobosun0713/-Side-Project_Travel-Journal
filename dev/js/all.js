$(function () {
    hamburger()
    Tab01()
    Tab02()
    Tab03()
    Aos()
    Top()
    Lightbox()
})

// 呼叫函示==============

// == 漢堡選單 ==
function hamburger() {
    $("button.btn_switch").on("click", function () {
        $("nav.main_nav").slideToggle()
    })

    $("button.hamburger").on("click", function () {
        $(this).toggleClass("is-active")
    })
}

// == 標籤01 ==
function Tab01() {
    // 預設顯示第一個 Tab
    var _showTab = 0
    $(".abgne_tab").each(function () {
        // 目前的頁籤區塊
        var $tab = $(this)

        var $defaultLi = $("ul.tabs li", $tab).eq(_showTab).addClass("active")
        $($defaultLi.find("a").attr("href")).siblings().hide()

        // 當 li 頁籤被點擊時...
        // 若要改成滑鼠移到 li 頁籤就切換時, 把 click 改成 mouseover
        $("ul.tabs li", $tab)
            .click(function () {
                // 找出 li 中的超連結 href(#id)
                var $this = $(this),
                    _clickTab = $this.find("a").attr("href")
                // 把目前點擊到的 li 頁籤加上 .active
                // 並把兄弟元素中有 .active 的都移除 class
                $this.addClass("active").siblings(".active").removeClass("active")
                // 淡入相對應的內容並隱藏兄弟元素
                $(_clickTab).stop(false, true).fadeIn().siblings().hide()

                return false
            })
            .find("a")
            .focus(function () {
                this.blur()
            })
    })
}

// == 標籤02 ==
function Tab02() {
    var autoTab = setInterval(changeTab, 2000)
    $(".js-navUl").hover(
        function () {
            clearInterval(autoTab)
        },
        function () {
            autoTab = setInterval(changeTab, 2000)
        }
    )
    var tabIndex = 0
    function changeTab() {
        $(".js-navUl li").eq(tabIndex).addClass("activeLi").siblings().removeClass("activeLi")
        if ($("#tabCon" + tabIndex)) {
            $("#tabCon" + tabIndex)
                .show()
                .siblings()
                .hide()
        }
        tabIndex++
        if (tabIndex == 6) {
            tabIndex = 0
        }
    }
    $(".js-navUl li").on("click", function () {
        var ind = $(this).index()
        if ($("#tabCon" + ind)) {
            $("#tabCon" + ind)
                .show()
                .siblings()
                .hide()
        }
        if (ind != 4) {
            tabIndex = ind + 1
        } else {
            tabIndex = 0
        }
        $(this).addClass("activeLi").siblings().removeClass("activeLi")
    })
}

// == 標籤03 ==
function Tab03() {
    $(".jS-navUl ul li").on("click", function () {
        var ind = $(this).index()
        if ($("#tab" + ind)) {
            $("#tab" + ind)
                .show()
                .siblings()
                .hide()
        }
        if (ind != 4) {
            tabIndex = ind + 1
        } else {
            tabIndex = 0
        }
        $(this).addClass("activeLI").siblings().removeClass("activeLI")
    })
}

// == AOS特效設定 ==
function Aos() {
    $(function () {
        AOS.init({
            duration: 1000,
            easing: "ease-in-sine",
            once: true,
        })
    })
}

// == GO_TOP ==
function Top() {
    $(function () {
        $("#BackTop").click(function () {
            $("html,body").animate({ scrollTop: 0 }, 500)
        })
        $(window)
            .scroll(function () {
                if ($(this).scrollTop() > 300) {
                    $("#BackTop").fadeIn(300)
                } else {
                    $("#BackTop").stop().fadeOut(300)
                }
            })
            .scroll()
    })
}

// == 燈箱 ==
function Lightbox() {
    var button = document.getElementById("login_btn")
    var lightbox = document.getElementById("lightbox")
    var lightboxClose = document.getElementById("lightboxClose")
    var cancel_login = document.getElementById("cancel_login")
    button.onclick = function () {
        lightbox.style.display = "block"
    }
    lightboxClose.onclick = function () {
        lightbox.style.display = "none"
    }
    cancel_login.onclick = function () {
        lightbox.style.display = "none"
    }
}
