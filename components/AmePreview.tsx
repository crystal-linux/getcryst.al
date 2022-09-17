const AmePreview = () => (
  <div className="bg-ctp-mantle h-fit w-full md:w-auto rounded-lg [&_p]:text-xs [&_p]:md:text-base md:text-base p-5 font-bold shadow-ctp-crust whitespace-nowrap overflow-hidden shadow-lg font-fira-code select-none border-ctp-crust border">
    <p className="text-ctp-blue font-normal">{"~"}</p>
    <p className="font-normal">
      <span className="text-ctp-blue">{">"}</span>
      <span className="text-ctp-green">{" ame"}</span>
      {" install neovim-git"}
    </p>
    <p className="text-ctp-green font-normal">All packages found</p>
    <p className="text-ctp-green">neovim-git</p>
    <p>
      Do you want to install these packages and package dependencies?
      <span className="font-normal">{" yes"}</span>
    </p>
    <p>
      <span className="text-ctp-maroon">{"❖ "}</span>
      Downloading sources
    </p>
    <p>
      neovim-git:{" "}
      <span className="font-normal text-ctp-green">Downloaded!</span>
    </p>
    <p>
      <span className="text-ctp-maroon">{"❖ "}</span>All sources are ready.
    </p>
    <p>
      Select packages to review:
      <span className="font-normal">{" No selections"}</span>
    </p>
    <p>
      Do you still want to install those packages?
      <span className="font-normal">{" yes"}</span>
    </p>
    <p>
      <span className="text-ctp-maroon">{"❖ "}</span>Installing 1 package
    </p>
    <p>
      <span className="text-ctp-maroon">{"❖ "}</span>Building packages
    </p>
    <p>
      neovim-git:
      <span className="font-normal text-ctp-green">{" Built!"}</span>
    </p>
    <p>
      <span className="text-ctp-maroon">{"❖ "}</span>Built 1 package
    </p>
    <p>
      <span className="text-ctp-maroon">{"❖ "}</span>Installing packages
    </p>
    <p className="font-normal">doas (marsh@town) password: </p>
    <p className="font-normal">loading packages...</p>
    <p className="font-normal">resolving dependencies...</p>
    <p className="font-normal">looking for conflicting packages...</p>
    <p className="mt-4">
      Packages (1)<span className="font-normal">{" neovim-git"}</span>
      <span className="text-ctp-surface2">{"-0.7.0.r1848.g622968d7b3-1"}</span>
    </p>
    <p className="mt-4">
      Total Installed Size:<span className="font-bold">{"  34.36 MiB"}</span>
    </p>
    <p>
      Net Upgrade Size:<span className="font-bold">{"       0.19 MiB"}</span>
    </p>
    <p className="mt-4 after:content-[''] after:w-[10px] after:h-[20px] after:bg-ctp-rosewater after:inline-block after:animate-blink flex items-center gap-2">
      <span className="text-ctp-blue">{":: "}</span>Proceed with installation?
      [Y/n]
    </p>
  </div>
);
export default AmePreview;
