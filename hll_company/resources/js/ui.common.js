$(document).ready(function () {
    $.fn.accordion = function () {
        this.each(function (index, element) {
            $("[data-accordion-header]", element).click(function (e) {
            e.preventDefault();
            const contentEl = $(
                `[data-accordion-content="${this.dataset.accordionHeader}"]`,
                element
            );
            const expanded = $(this).hasClass("is-expanded");
            $(this).toggleClass("is-expanded", !expanded);
            contentEl.css("max-height", expanded ? 0 : contentEl[0]?.scrollHeight);
            });
        });
    };
});