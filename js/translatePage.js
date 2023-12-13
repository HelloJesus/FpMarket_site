const googleTranslateConfig = {
	/* Original language */
	lang: "en",
};

document.addEventListener("DOMContentLoaded", (event) => {
	/* Connecting the google translate widget */
	let script = document.createElement("script");
	script.src = `https://translate.google.com/translate_a/element.js?cb=TranslateWidgetIsLoaded`;
	document.getElementsByTagName("head")[0].appendChild(script);
});

function TranslateWidgetIsLoaded() {
	TranslateInit(googleTranslateConfig);
}

function TranslateInit(config) {
	if (config.langFirstVisit && !Cookies.get("googtrans")) {
		/* If the translation language is installed for the first visit and cookies are not assigned */
		TranslateCookieHandler("/auto/" + config.langFirstVisit);
	}

	let code = TranslateGetCode(config);

	TranslateHtmlHandler(code);
	
	if (code == config.lang) {
		/* If the default language is the same as the language we are translating into, then we clear the cookies */
		// TranslateCookieHandler(null, config.domain); // удалено 23:17
	}
	/* Initialize the widget with the default language */
	new google.translate.TranslateElement({
		pageLanguage: config.lang,
	});
	TranslateEventHandler("click", "[data-google-lang]", function (e) {
		TranslateCookieHandler(
			"/" + config.lang + "/" + e.getAttribute("data-google-lang"),
			config.domain
		);


		window.location.reload();
	});
}

function TranslateGetCode(config) {
	let lang =
		Cookies.get("googtrans") != undefined && Cookies.get("googtrans") != "null"
			? Cookies.get("googtrans")
			: config.lang;
	return lang.match(/(?!^\/)[^\/]*$/gm)[0];
}

function TranslateCookieHandler(val, domain) {
	Cookies.set("googtrans", val);
	Cookies.set("googtrans", val, {
		domain: "." + document.domain,
	});

	if (domain == "undefined") return;
	/* Writing down cookies for the domain, if it is assigned in the config */
	Cookies.set("googtrans", val, {
		domain: domain,
	});

	Cookies.set("googtrans", val, {
		domain: "." + domain,
	});
}

function TranslateEventHandler(event, selector, handler) {
	document.addEventListener(event, function (e) {
		let el = e.target.closest(selector);
		if (el) handler(el);
	});
}

function TranslateHtmlHandler(code) {
	/* We get the language to which we translate and produce the necessary manipulations with DOM */
	if (document.querySelector('[data-google-lang="' + code + '"]') !== null) {
		document
			.querySelector('[data-google-lang="' + code + '"]')
			.classList.add("language__img_active");
	}
}