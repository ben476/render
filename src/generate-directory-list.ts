// From https://github.com/zadeviggers/html-templates/
const imageExtentions = ["jpg", "jpeg", "png", "gif", "bmp", "svg"];
const videoExtentions = [
	"mp4",
	"avi",
	"mkv",
	"mov",
	"wmv",
	"flv",
	"mpg",
	"mpeg",
];
const audioExtentions = ["mp3", "wav", "ogg", "flac", "aac"];

interface DirectoryListBreadcrumb {
	name: string;
	url?: string;
}
interface DirectoryListItem {
	folder: boolean;
	name: string;
	url: string;
}

export const generateHTMLDirectoryList = (
	breadcrumbs: DirectoryListBreadcrumb[],
	items: DirectoryListItem[]
): string => `<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>Directory listing</title>
		<!-- Template made by Zade Viggers. https://github.com/zadeviggers/html-templates -->
		<!-- Icons from Feather Icons. https://feathericons.com/ -->
		<style>
			:root {
				--background: white;
				--text-light: #6e6e6e;
				--text: #313131;
				--spacing: 20px;
			}
			@media screen and (prefers-color-scheme: dark) {
				:root {
					--background: #313131;
					--text: #d3d3d3;
					--light-text: white;
				}
			}
			* {
				box-sizing: border-box;
				margin: 0;
				padding: 0;
				border: 0;
				font-family: sans-serif;
				color: var(--text);
			}
			a {
				text-decoration: none;
				cursor: pointer;
				color: var(--text);
			}
			a:hover,
			a:focus-visible {
				text-decoration: underline;
				color: var(--light-text);
			}
			a > * {
				color: currentColor;
			}
			html,
			body {
				background-color: var(--background);
			}
			body {
				display: flex;
				flex-direction: column;
				max-height: 100vh;
			}
			#breadcrumbs {
				display: flex;
				flex-wrap: wrap;
				gap: 10px;
				padding: var(--spacing);
			}
			#list {
				flex: 1;
				display: flex;
				flex-direction: column;
				flex-wrap: wrap;
				overflow-x: scroll;
				list-style-type: none;
				gap: calc(var(--spacing) * 1.5);
				padding-left: var(--spacing);
			}
			#list > a {
				width: 190px;
				display: flex;
				align-items: center;
				gap: calc(var(--spacing) / 2);
			}
			#list > a > .text {
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
			}
			.icon {
				flex-shrink: 0;
				display: inline-block;
				width: 24px;
				height: 24px;
				fill: transparent;
				stroke: var(--text);
				stroke-width: 2;
				stroke-linecap: round;
				stroke-linejoin: round;
			}
			.hidden {
				display: none;
			}
		</style>
	</head>
	<body>
		<div class="hidden">
			<svg>
				<defs>
					<g id="file-icon">
						<path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path>
						<polyline points="13 2 13 9 20 9"></polyline>
					</g>
					<g id="folder-icon">
						<path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
					</g>
					<g id="image-icon">
						<rect
							x="3"
							y="3"
							width="18"
							height="18"
							rx="2"
							ry="2"
						></rect>
						<circle cx="8.5" cy="8.5" r="1.5"></circle>
						<polyline points="21 15 16 10 5 21"></polyline>
					</g>
					<g id="video-icon">
						<rect
							x="2"
							y="2"
							width="20"
							height="20"
							rx="2.18"
							ry="2.18"
						></rect>
						<line x1="7" y1="2" x2="7" y2="22"></line>
						<line x1="17" y1="2" x2="17" y2="22"></line>
						<line x1="2" y1="12" x2="22" y2="12"></line>
						<line x1="2" y1="7" x2="7" y2="7"></line>
						<line x1="2" y1="17" x2="7" y2="17"></line>
						<line x1="17" y1="17" x2="22" y2="17"></line>
						<line x1="17" y1="7" x2="22" y2="7"></line>
					</g>
					<g id="audio-icon">
						<path d="M9 18V5l12-2v13"></path>
						<circle cx="6" cy="18" r="3"></circle>
						<circle cx="18" cy="16" r="3"></circle>
					</g>
				</defs>
			</svg>
		</div>
		<h1 id="breadcrumbs">
			${breadcrumbs.map((breadcrumb) =>
				breadcrumb.url
					? `<span>${breadcrumb.name} /</span>`
					: `<a href="${breadcrumb.url}">${breadcrumb.name} /</a>`
			)}
		</h1>
		<main id="list">
			${items.map((item) => {
				let iconID = item.folder ? "folder-icon" : "file-icon";
				if (!item.folder) {
					const split = item.name.split(".");
					if (split.length > 1) {
						const extension = split.pop();
						if (imageExtentions.includes(extension))
							iconID = "image-icon";
						else if (videoExtentions.includes(extension))
							iconID = "video-icon";
						else if (audioExtentions.includes(extension))
							iconID = "audio-icon";
					}
				}

				return `<a href="${item.url}" title="${item.name}">
	<svg class="icon" viewBox="0 0 24 24">
		<use xlink:href="#${iconID}"></use>
	</svg>
	<span class="text">
		${item.name}
	</span>
</a>`;
			})}
		</main>
	</body>
</html>`;
