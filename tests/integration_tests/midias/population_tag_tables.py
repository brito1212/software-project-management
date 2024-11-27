"""
    This file is responsible for insert a tags in the system.
"""

import dependencies_test.tags_automation as tags

test = tags.TagsAutomation()

tags.login_admin(test)
test.populate_teble('a[href="/admin/midia/genres/add/"]')
test.populate_teble('a[href="/admin/midia/platforms/add/"]')