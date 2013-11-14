define(function () {
    return {
        admin: {
          verify: "/admin/verify",
          logout: "/admin/logout"
        },
        file: {
          base:   "/admin/file",
          create: "/admin/file/create",
          dlt:    "/admin/file/delete",
          move:   "/admin/file/move",
          files:  "/admin/files",
          tree:   "/admin/file/tree",
          upload: "/admin/file/upload"
        },
        git: {
          submit: '/admin/git'
        },
        codemirror: {
          modes: "vendor/codemirror/mode"
        },
        cache:{
          clear: '/cache/clear'
        }
    }
});